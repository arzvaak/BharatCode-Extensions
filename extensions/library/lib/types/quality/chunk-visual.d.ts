/**
 * Port of RAG-Chunk-Visualizer (upstream/PerryLink, Apache-2.0): the
 * sliding-window `chunk_text` algorithm plus the structured diagnostics that
 * power `library_diagnose`. Pure functions — no I/O, no model.
 * @module dsh-library/quality/chunk-visual
 */
/** One sliding-window chunk, mirroring the upstream `Chunk` dataclass. */
export interface Chunk {
    readonly text: string;
    readonly startPos: number;
    readonly endPos: number;
    readonly index: number;
    readonly overlapChars: number;
}
/**
 * Slice one text into sliding-window chunks — the exact algorithm of the
 * upstream `chunk_text`. Validation matches upstream: `chunkSize` > 0,
 * `overlap` ≥ 0 and strictly smaller than `chunkSize`.
 * @param text - the text to slice.
 * @param chunkSize - window width in characters.
 * @param overlap - overlap between consecutive windows in characters.
 * @returns the chunk list (empty for empty input).
 * @throws TypeError on invalid parameters.
 */
export declare function chunkText(text: string, chunkSize: number, overlap: number): Chunk[];
/** Size-bucket boundary: powers of two from 256 chars up (diagnose histogram). */
export declare const CHUNK_SIZE_BUCKETS: readonly number[];
/** Per-bucket character counts of one chunk list. */
export interface ChunkSizeHistogram {
    readonly buckets: readonly {
        label: string;
        min: number;
        max: number | null;
        count: number;
    }[];
    readonly minChars: number;
    readonly maxChars: number;
    readonly meanChars: number;
    readonly totalChars: number;
}
/**
 * Bucket one chunk list into size classes and fold the basic size facts.
 * @param chunks - the chunks to analyze.
 * @returns the histogram and size summary.
 */
export declare function chunkSizeHistogram(chunks: readonly Chunk[]): ChunkSizeHistogram;
/** Folded structural statistics of one document's chunk list. */
export interface ChunkDiagnostics {
    readonly chunkCount: number;
    readonly totalChars: number;
    readonly histogram: ChunkSizeHistogram;
    /** How many of the total chars live in overlapping windows (redundancy signal). */
    readonly overlapChars: number;
    /** overlapChars as a percentage of totalChars. */
    readonly overlapPercent: number;
    /** True when the last chunk is shorter than the others (a normal, expected tail). */
    readonly truncatedTail: boolean;
    /** Maximum single-chunk char count. */
    readonly maxChunkChars: number;
}
/**
 * Fold the structural diagnostics of one chunk list — the visualization
 * module's numbers without any rendering.
 * @param chunks - the chunks to analyze.
 * @returns the folded diagnostics.
 */
export declare function diagnoseChunks(chunks: readonly Chunk[]): ChunkDiagnostics;
/**
 * Stable per-chunk content hash (FNV-1a) — the duplicate-detection key.
 * @param chunk - the chunk to hash.
 * @returns the hex hash.
 */
export declare function chunkHash(chunk: Chunk): string;
/** One detected near-duplicate pair. */
export interface DuplicatePair {
    readonly indexA: number;
    readonly indexB: number;
    readonly similarity: number;
}
/**
 * Find exact and near-duplicate chunk pairs by cosine similarity over the
 * pair's shared token vocabulary (the diversity module's measure). The scan
 * is quadratic, so callers bound the input.
 * @param chunks - the chunks to scan.
 * @param threshold - similarity above which a pair counts as duplicate.
 * @param maxPairs - cap on reported pairs (the scan still computes the count).
 * @returns reported pairs and the duplicate count.
 */
export declare function findDuplicateChunks(chunks: readonly Chunk[], threshold: number, maxPairs: number): {
    pairs: DuplicatePair[];
    duplicateCount: number;
};
//# sourceMappingURL=chunk-visual.d.ts.map