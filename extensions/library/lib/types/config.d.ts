/**
 * Config schema and resolution for `dsh-library`. Every tunable is a
 * validated {@link Config} field changeable from cordis.yml (no hardcoded
 * tunables); `resolveConfig` is the explicit resolution step that fails loud
 * on out-of-range values and invalid embedder commands.
 * @module dsh-library/config
 */
import z from '@deepseek-ai/schemastery';
/** Library names: safe as domain keys and shown verbatim to the model. */
export declare const LIBRARY_NAME: RegExp;
/** Chunking defaults: window size and overlap, in characters. */
export declare const DEFAULT_CHUNK_SIZE = 900;
export declare const DEFAULT_CHUNK_OVERLAP = 120;
/** Files larger than this are rejected with a clear error instead of being truncated. */
export declare const DEFAULT_MAX_FILE_BYTES: number;
/** Absolute safety bound on one stored chunk (chunkSize must stay below it). */
export declare const MAX_CHUNK_CHARS = 4000;
/** Hash-embedding dimensionality used by the zero-download local embedder. */
export declare const DEFAULT_EMBEDDING_DIMS = 256;
/** Local Ollama base URL (zero cloud — only this localhost endpoint is ever contacted). */
export declare const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
/** Default Ollama embedding model. */
export declare const DEFAULT_OLLAMA_MODEL = "nomic-embed-text";
/** Embedder subprocess budget. */
export declare const DEFAULT_EMBEDDING_TIMEOUT_MS = 30000;
export declare const DEFAULT_EMBEDDING_GRACE_MS = 1000;
export declare const DEFAULT_EMBEDDING_MAX_OUTPUT_BYTES: number;
export declare const DEFAULT_EMBEDDING_MAX_BATCH = 64;
/** Search defaults. */
export declare const DEFAULT_SEARCH_TOPK = 8;
export declare const DEFAULT_SEARCH_HYBRID_WEIGHT = 0.6;
export declare const DEFAULT_SEARCH_MIN_RELEVANCE = 0.15;
export declare const DEFAULT_SEARCH_DIVERSITY_LAMBDA = 0.5;
export declare const DEFAULT_SEARCH_MAX_RESULT_CHARS = 16000;
/** Lost-in-the-middle avoidance: strongest results pinned to head and tail. */
export declare const DEFAULT_LOST_MIDDLE_HEAD = 1;
export declare const DEFAULT_LOST_MIDDLE_TAIL = 1;
/** Injection defaults. */
export declare const DEFAULT_INJECT_MAX_CHARS = 12000;
/** Citation defaults. */
export declare const DEFAULT_CITATION_WINDOW_CHARS = 150;
export declare const DEFAULT_CITATION_MIN_SCORE = 40;
export declare const DEFAULT_CITATION_MIN_SEMANTIC = 0.1;
/** Purge verification defaults. */
export declare const DEFAULT_PURGE_SIGNATURE_LENGTH = 4;
export declare const DEFAULT_PURGE_MAX_PROBES = 24;
/** Diagnose defaults. */
export declare const DEFAULT_DIAGNOSE_MAX_DUPLICATE_PAIRS = 24;
export declare const DEFAULT_DIAGNOSE_SAMPLE_CAP = 200;
export declare const DEFAULT_DIAGNOSE_POSITION_BINS = 5;
/** Embedder selection: built-in hash embedding, an external command, or a local Ollama server. */
export interface EmbeddingConfig {
    /** Hash-embedding dimensionality (built-in embedder only). Must be ≥ 8. */
    dims?: number;
    /**
     * Which embedder backend to use: `hash` (built-in, zero downloads), `command`
     * (the external subprocess protocol, requires `command`), or `ollama` (a
     * local Ollama server, probed and degraded to `hash` when unavailable).
     * When `command` is set, the command provider wins regardless of this field.
     */
    provider?: 'hash' | 'command' | 'ollama';
    /**
     * Optional external embedder command line (space-separated, no shell
     * interpretation; executed through `ctx.subprocess`). The command must read
     * one JSON object per text line on stdin (`{"index": <n>, "text": "..."}`)
     * and write one JSON object per line on stdout
     * (`{"index": <n>, "vector": [<number>, ...]}`). Indices must cover every
     * input line exactly once. When unset, the built-in deterministic hash
     * embedder runs with zero downloads.
     */
    command?: string;
    /** Local Ollama base URL for the `ollama` provider (default `http://127.0.0.1:11434`). */
    ollamaUrl?: string;
    /** Ollama embedding model name (default `nomic-embed-text`). */
    ollamaModel?: string;
    /** Cooperative timeout for one embedder invocation (ms). */
    timeoutMs?: number;
    /** Terminate-escalation grace handed to the subprocess seam (ms). */
    graceMs?: number;
    /** Max bytes of one embedder stdout before the batch fails. */
    maxOutputBytes?: number;
    /** Max texts embedded per subprocess invocation; larger batches are split. */
    maxBatchItems?: number;
}
/** Search pipeline tuning (hybrid scoring → diversity re-rank → relevance filter → position strategy). */
export interface SearchConfig {
    /** How many chunks one search returns after the full pipeline. */
    topK?: number;
    /**
     * Hybrid weight: 0 = keyword-only, 1 = semantic-only. Keyword and semantic
     * scores are each normalized to 0..1 before combining.
     */
    hybridWeight?: number;
    /** Chunks scoring below this relevance threshold are filtered out (fail closed to fewer, better results). */
    minRelevance?: number;
    /** Diversity re-rank weight: 1 = pure relevance order, 0 = pure diversity. */
    diversityLambda?: number;
    /** Strongest chunks pinned to the head of the context (lost-in-the-middle avoidance). */
    lostMiddleHead?: number;
    /** Strongest chunks pinned to the tail of the context. */
    lostMiddleTail?: number;
    /** Character budget for the model-facing result page; longer pages are truncated with a marker. */
    maxResultChars?: number;
}
/** On-demand `agent.inject()` behavior of `library_search`. */
export interface InjectionConfig {
    /** Whether `library_search` with `inject: true` injects into the calling agent. */
    enabled?: boolean;
    /** Character budget of one injected context message. */
    maxChars?: number;
}
/** Citation checking thresholds for `library_cite_check`. */
export interface CitationConfig {
    /** Context window (chars) around each citation marker that forms the claim. */
    windowChars?: number;
    /** Minimum fuzzy token-match score (0-100) for a citation to be valid. */
    minScore?: number;
    /** Minimum semantic similarity (hash embedding, 0-1) for a citation to be valid. */
    minSemantic?: number;
}
/** Purge verification (RAG-Purge-Verify port) after `library_remove`. */
export interface PurgeConfig {
    /** Token n-gram length of the removed-content signatures scanned for residue. */
    signatureLength?: number;
    /** How many signatures are probed per removal; longer documents sample deterministically. */
    maxProbes?: number;
}
/** `library_diagnose` budget caps. */
export interface DiagnoseConfig {
    /** Cap on reported near-duplicate chunk pairs. */
    maxDuplicatePairs?: number;
    /** Chunks sampled into the duplicate scan (the pair check is quadratic). */
    sampleCap?: number;
    /** How many position bins the lost-in-the-middle report uses. */
    positionBins?: number;
}
/** Raw plugin config — every field optional; {@link Config} supplies the defaults. */
export interface Config {
    /** Sliding-window chunk size in characters. */
    chunkSize?: number;
    /** Sliding-window overlap in characters; must be smaller than {@link Config.chunkSize}. */
    chunkOverlap?: number;
    /** Max bytes of one imported file; larger files fail with a clear error. */
    maxFileBytes?: number;
    /** Embedding options (see {@link EmbeddingConfig}). */
    embedding?: EmbeddingConfig;
    /** Search pipeline options (see {@link SearchConfig}). */
    search?: SearchConfig;
    /** Injection options (see {@link InjectionConfig}). */
    injection?: InjectionConfig;
    /** Citation options (see {@link CitationConfig}). */
    citation?: CitationConfig;
    /** Purge options (see {@link PurgeConfig}). */
    purge?: PurgeConfig;
    /** Diagnose options (see {@link DiagnoseConfig}). */
    diagnose?: DiagnoseConfig;
}
/** Resolved embedding config: defaults applied, `command` explicitly optional. */
export interface ResolvedEmbeddingConfig {
    readonly dims: number;
    readonly provider: 'hash' | 'command' | 'ollama';
    readonly command: string | undefined;
    readonly ollamaUrl: string;
    readonly ollamaModel: string;
    readonly timeoutMs: number;
    readonly graceMs: number;
    readonly maxOutputBytes: number;
    readonly maxBatchItems: number;
}
/** Resolved search config after defaulting. */
export interface ResolvedSearchConfig {
    readonly topK: number;
    readonly hybridWeight: number;
    readonly minRelevance: number;
    readonly diversityLambda: number;
    readonly lostMiddleHead: number;
    readonly lostMiddleTail: number;
    readonly maxResultChars: number;
}
/** Resolved injection config after defaulting. */
export interface ResolvedInjectionConfig {
    readonly enabled: boolean;
    readonly maxChars: number;
}
/** Resolved citation config after defaulting. */
export interface ResolvedCitationConfig {
    readonly windowChars: number;
    readonly minScore: number;
    readonly minSemantic: number;
}
/** Resolved purge config after defaulting. */
export interface ResolvedPurgeConfig {
    readonly signatureLength: number;
    readonly maxProbes: number;
}
/** Resolved diagnose config after defaulting. */
export interface ResolvedDiagnoseConfig {
    readonly maxDuplicatePairs: number;
    readonly sampleCap: number;
    readonly positionBins: number;
}
/** Config after {@link resolveConfig}: every optional field has its explicit default. */
export interface ResolvedConfig {
    readonly chunkSize: number;
    readonly chunkOverlap: number;
    readonly maxFileBytes: number;
    readonly embedding: ResolvedEmbeddingConfig;
    readonly search: ResolvedSearchConfig;
    readonly injection: ResolvedInjectionConfig;
    readonly citation: ResolvedCitationConfig;
    readonly purge: ResolvedPurgeConfig;
    readonly diagnose: ResolvedDiagnoseConfig;
}
/** Schemastery schema: the loader validates and fills defaults before `apply`. */
export declare const Config: z<Config>;
/**
 * Validate raw values and compile the resolved config. Defaults are applied
 * HERE — the explicit resolution step — so a partially-specified config from
 * a direct `ctx.plugin` mount behaves like the loader-filled one.
 * @param config - raw (possibly partial) plugin config.
 * @returns the fully resolved config.
 * @throws TypeError on non-positive caps, an oversized chunk window, or an
 *   embedder command without an executable part (misconfiguration fails loud).
 */
export declare function resolveConfig(config?: Config): ResolvedConfig;
//# sourceMappingURL=config.d.ts.map