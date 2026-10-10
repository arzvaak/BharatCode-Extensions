/**
 * Port of RAG-Reference-Checker (upstream/PerryLink, Apache-2.0): citation
 * extraction (`[n]` markers), the surrounding-context window, and the
 * verify loop that marks each citation valid / suspicious / missing. The
 * upstream SentenceTransformer model (and its `download_model.py`) is
 * replaced by the plugin's deterministic hash embedder — zero downloads, and
 * the similarity threshold is the resolved `citation.minSemantic` config.
 * @module dsh-library/quality/reference
 */
/** One extracted citation marker: its numeric id and [start, end) span. */
export interface CitationMarker {
    readonly refId: number;
    readonly start: number;
    readonly end: number;
}
/**
 * Extract every `[<digits>]` citation marker — the upstream
 * `extract_citations` (`r'\[(\d+)\]'`), with the numeric id returned as a
 * number like the upstream `int(match.group(1))`.
 * @param text - the answer text.
 * @returns the markers in scan order.
 */
export declare function extractCitations(text: string): CitationMarker[];
/**
 * Extract the character window around a citation position — the upstream
 * `extract_context` (`position ± window`, trimmed).
 * @param text - the answer text.
 * @param position - the citation marker position.
 * @param window - half-window size in characters.
 * @returns the trimmed context.
 */
export declare function extractContext(text: string, position: number, window?: number): string;
/** One reference document the checker verifies against. */
export interface ReferenceDocument {
    readonly id: number;
    readonly content: string;
}
/** One citation verdict — the upstream per-citation result dictionary. */
export interface ReferenceVerdict {
    readonly refId: number;
    /** `valid` (similarity ≥ threshold), `suspicious` (below), or `missing` (unknown id). */
    readonly status: 'valid' | 'suspicious' | 'missing';
    /** Semantic similarity, rounded to two decimals like upstream. */
    readonly similarity: number;
    /** The claim context the similarity was computed from. */
    readonly context: string;
    /** Present on suspicious/missing verdicts only. */
    readonly reason?: string;
}
/** The whole verification report — the upstream `verify_references` return. */
export interface ReferenceReport {
    readonly total: number;
    readonly valid: number;
    readonly suspicious: number;
    readonly details: readonly ReferenceVerdict[];
}
/** Verification options: similarity threshold and embedding dimensionality. */
export interface ReferenceOptions {
    /** Similarity threshold (0..1); below it a citation is `suspicious`. */
    readonly threshold?: number;
    /** Hash-embedding dimensionality. */
    readonly dims?: number;
}
/**
 * Verify every citation in an answer against the reference list — the
 * upstream `verify_references` with the hash embedder substituted for the
 * model. Unknown reference ids are `missing`; known ids whose context
 * similarity falls below the threshold are `suspicious`.
 * @param answer - the answer text containing `[n]` markers.
 * @param references - the reference documents keyed by numeric id.
 * @param options - verification options.
 * @returns the verification report.
 */
export declare function verifyReferences(answer: string, references: readonly ReferenceDocument[], options?: ReferenceOptions): ReferenceReport;
//# sourceMappingURL=reference.d.ts.map