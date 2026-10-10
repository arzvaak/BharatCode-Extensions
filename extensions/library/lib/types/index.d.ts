/**
 * `dsh-library` — the local-first knowledge base for DeepSeek Harness:
 * import md/txt documents into a storage-domain index, retrieve with a
 * hybrid semantic+keyword pipeline (diversity re-rank, relevance filter,
 * lost-in-the-middle avoidance), verify citations against retrieved chunks,
 * and diagnose chunk/retrieval quality. Everything model-visible carries a
 * source marker. The `library/inject` and `library/purge` audit events are
 * appended through the adaptive host gate (see `events.ts`); where the host
 * cannot carry them, the logged `tool/call` + `tool/result` events remain the
 * reconstructable trail. Document paths and embeddings never reach the log.
 *
 * Function plugin — no default export (the Loader unwraps
 * `exports.default ?? exports`).
 * @module dsh-library
 */
import type { Context } from '@deepseek-ai/cordis';
import { type Domain } from '@deepseek-ai/dsh-storage-domain';
import { z as zod } from 'zod';
import type { ContextFormed } from '@deepseek-ai/dsh-llm';
/**
 * Producer-owned message attribution for the retrieval page this plugin
 * injects.
 *
 * The harness's `MessageSourceMap` is a merge-extensible sum type: each
 * producer declares its own `kind` in its own module, and the retired
 * catch-all `{ kind: 'plugin', plugin }` shape no longer exists. It is gone
 * from BOTH layers that used to accept it — the type layer
 * (`packages/llm/llm/src/message.ts`) and the persistence layer
 * (`session-format-v3-to-v4/src/message-sources.ts`), which refuses a physical
 * row whose source `kind` is `'plugin'`, so a cast cannot smuggle one past
 * admission. The host's own producers do exactly this (`tool-jobs` declares
 * `{ kind: 'tool-jobs' } & ContextFormed`).
 *
 * Nothing in this package folds messages by source, so the retired spelling
 * only has to stay LOADABLE, which the host's own V3→V4 migration guarantees.
 */
declare module '@deepseek-ai/dsh-llm' {
    interface MessageSourceMap {
        /** This plugin's model-visible retrieval injection (the `library/inject` page). */
        'dsh-library': {
            kind: 'dsh-library';
        } & ContextFormed;
    }
}
import { Config, type ResolvedConfig } from './config.js';
import { type Embedder } from './embedding.js';
import { chunkSizeHistogram } from './quality/chunk-visual.js';
export declare const name = "dsh-library";
/** Hard services: the durable index lives in the storage domain; tools and the command register here. */
export declare const inject: string[];
export { Config, resolveConfig, LIBRARY_NAME } from './config.js';
export type { ResolvedConfig, EmbeddingConfig, SearchConfig, InjectionConfig, CitationConfig, PurgeConfig, DiagnoseConfig } from './config.js';
export { embedHash, cosine, splitCommandLine, HashEmbedder, CommandEmbedder, OllamaEmbedder, probeOllama, resolveEmbedder } from './embedding.js';
export type { Embedder, EmbedderResolution } from './embedding.js';
export { CHUNK_SIZE_BUCKETS, chunkSizeHistogram, chunkText, chunkHash, findDuplicateChunks } from './quality/chunk-visual.js';
export type { Chunk, ChunkSizeHistogram, ChunkDiagnostics } from './quality/chunk-visual.js';
export { checkDiversity, maximalMarginalRelevance } from './quality/diversity.js';
export type { DiversityReport, RerankCandidate, DuplicatePair } from './quality/diversity.js';
export { successByPosition, makeProbe, insertProbe, buildProbePrompt, avoidLostMiddle, positionBins, middlePenalty, PROBE_PREFIX } from './quality/lost-middle.js';
export type { ProbeResult, PositionStats, RankedItem, PositionBin } from './quality/lost-middle.js';
export { scoreRelevance, scoreBatch, filterDocuments } from './quality/relevance.js';
export type { ScoredDocument } from './quality/relevance.js';
export { validateQaPair, selectFewShot, formatFewShotPrompt } from './quality/few-shot.js';
export type { QaExample, SelectedExample, FewShotOptions } from './quality/few-shot.js';
export { extractCitations, extractContext, verifyReferences } from './quality/reference.js';
export type { CitationMarker, ReferenceDocument, ReferenceVerdict, ReferenceReport, ReferenceOptions } from './quality/reference.js';
export { extractCitationNumbers, extractSentenceWithCitation, fuzzyPartialRatio, validateCitation, validateCitations } from './quality/citation.js';
export type { CitationMatch, ValidationResult } from './quality/citation.js';
export { verifyPurge, sampleSignatures } from './quality/purge.js';
export type { RemainingChunk, PurgeProbeResult, PurgeReport, PurgeOptions } from './quality/purge.js';
export { INJECT_EVENT, PURGE_EVENT, appendAuditEvent } from './events.js';
export type { LibraryInjectEvent, LibraryPurgeEvent } from './events.js';
/** The dsh-library storage-domain declaration (unit names allow `[a-z][a-z0-9_]*` only). */
export declare const libraryDomainSpec: {
    name: string;
    version: number;
    tables: {
        documents: {
            valueSchema: zod.ZodObject<{
                library: zod.ZodString;
                documentId: zod.ZodString;
                name: zod.ZodString;
                contentHash: zod.ZodString;
                chunks: zod.ZodArray<zod.ZodString>;
                chars: zod.ZodNumber;
                createdAt: zod.ZodNumber;
            }, zod.core.$strip>;
        };
        chunks: {
            valueSchema: zod.ZodObject<{
                library: zod.ZodString;
                chunkId: zod.ZodString;
                documentId: zod.ZodString;
                seq: zod.ZodNumber;
                text: zod.ZodString;
                embedding: zod.ZodArray<zod.ZodNumber>;
            }, zod.core.$strip>;
        };
        purges: {
            valueSchema: zod.ZodObject<{
                purgeId: zod.ZodString;
                library: zod.ZodString;
                documentId: zod.ZodString;
                passed: zod.ZodBoolean;
                totalFound: zod.ZodNumber;
                at: zod.ZodNumber;
            }, zod.core.$strip>;
        };
    };
};
/** Optional seams resolved at call time; the embedder is resolved at mount (fail closed when absent). */
interface StoreDeps {
    readonly embedder: Embedder;
}
/** One `library_add` outcome. */
export interface LibraryAddResult {
    readonly library: string;
    readonly documentId: string;
    readonly name: string;
    readonly chunks: number;
    readonly chars: number;
}
/** One `library_remove` outcome, including the purge verification. */
export interface LibraryRemoveResult {
    readonly library: string;
    readonly documentId: string;
    readonly removedChunks: number;
    readonly purgePassed: boolean;
    readonly purgeTotalFound: number;
}
/** One `library_list` entry (no text). */
export interface LibraryListEntry {
    readonly library: string;
    readonly documentId: string;
    readonly name: string;
    readonly chunks: number;
    readonly chars: number;
    readonly createdAt: number;
}
/** One `library_search` hit. */
export interface LibrarySearchHit {
    readonly chunkId: string;
    readonly documentId: string;
    readonly seq: number;
    /** Snippet of the chunk text (sanitized, capped). */
    readonly snippet: string;
    /** Final combined score (post re-rank order is positional, not this value). */
    readonly score: number;
}
/** The `library_search` canonical result. */
export interface LibrarySearchResult {
    readonly library: string;
    readonly query: string;
    readonly results: LibrarySearchHit[];
    /** True when the result page was injected into the calling agent. */
    readonly injected: boolean;
}
/** One `library_cite_check` citation verdict. */
export interface LibraryCiteVerdict {
    readonly citation: string;
    readonly sourceDocumentId: string;
    readonly sourceSeq: number;
    readonly valid: boolean;
    readonly fuzzyScore: number;
    readonly semanticSimilarity: number;
    readonly reason: string;
}
/** The `library_cite_check` report. */
export interface LibraryCiteReport {
    readonly library: string;
    readonly query: string;
    readonly total: number;
    readonly valid: number;
    readonly details: LibraryCiteVerdict[];
}
/** The `library_diagnose` report. */
export interface LibraryDiagnoseReport {
    readonly library: string;
    readonly documents: number;
    readonly chunks: number;
    readonly histogram: ReturnType<typeof chunkSizeHistogram>;
    readonly duplicatePairs: number;
    readonly selfRetrieval: {
        probes: number;
        topKHit: number;
    };
    readonly middlePenalty: number;
}
/**
 * The index runtime over one open storage domain: add/remove/list/search/
 * cite/diagnose. All record shapes are validated by the domain at the
 * durable boundary; this class never logs text or embeddings.
 */
export declare class LibraryStore {
    private readonly config;
    private readonly deps;
    private readonly documents;
    private readonly chunks;
    private readonly purges;
    /**
     * @param domain - the opened dsh-library domain.
     * @param config - resolved plugin config.
     * @param deps - optional subprocess seam for the external embedder.
     */
    constructor(domain: Domain<typeof libraryDomainSpec>, config: ResolvedConfig, deps: StoreDeps);
    /** Embed a text batch with the resolved embedder backend. */
    private embed;
    /**
     * Import one document: chunk it, embed the chunks, and store the records.
     * @param library - target library name.
     * @param docName - display name.
     * @param content - full document text.
     * @returns the add summary.
     */
    add(library: string, docName: string, content: string): Promise<LibraryAddResult>;
    /**
     * Remove one document and verify the purge: the removed content must leave
     * no residue in the remaining chunks of the library.
     * @param library - owning library name.
     * @param documentId - stable document id.
     * @returns the removal summary plus the purge verdict.
     */
    remove(library: string, documentId: string): Promise<LibraryRemoveResult>;
    /** List documents (metadata only, never text) of one library or every library. */
    list(library?: string): LibraryListEntry[];
    /** All chunk records of one library, in document/seq order. */
    private chunksOf;
    /**
     * The hybrid retrieval pipeline: keyword + semantic scores, diversity
     * re-rank, relevance filter, lost-in-the-middle reorder, character budget.
     * @param library - library to search.
     * @param query - the query text.
     * @param topK - result cap (default from config).
     * @returns ranked hits.
     */
    search(library: string, query: string, topK?: number): Promise<LibrarySearchHit[]>;
    /** The citation sources for one query: the search pipeline result in order. */
    citeCheck(library: string, query: string, answer: string): Promise<LibraryCiteReport>;
    /** Diagnose one library: chunk stats, duplicates, self-retrieval, middle penalty. */
    diagnose(library: string): Promise<LibraryDiagnoseReport>;
}
/** The store service shared by every tool and the command. */
interface LibraryServices {
    readonly ctx: Context;
    readonly config: ResolvedConfig;
    readonly store: LibraryStore;
}
/**
 * Mount the plugin: open the storage domain, build the store, register the
 * tool family and the `/library` command. One effect owns the domain handle;
 * every registration is its own reversible effect.
 * @param ctx - the plugin context.
 * @param config - raw loader config; defaults applied through {@link resolveConfig}.
 */
export declare function apply(ctx: Context, config?: Config): Promise<void>;
/** Every tool definition, in registration order. */
export declare function allTools(services: LibraryServices): import("@deepseek-ai/dsh-tools").ToolDefinition[];
//# sourceMappingURL=index.d.ts.map