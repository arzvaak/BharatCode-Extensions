/**
 * Identity minting for dsh-library records: content-derived document ids,
 * per-chunk ids, and the unique ids that link injected model-visible text
 * back to its `library/inject` session event (model-visible ⟺ logged).
 * @module dsh-library/ids
 */
/** Stable document id: first 16 hex chars of the SHA-256 of its content. */
export declare function documentIdOf(content: string): string;
/** Chunk id: the owning document id plus the chunk sequence. */
export declare function chunkIdOf(documentId: string, seq: number): string;
/** Parse a chunk id back into its document id and sequence; null when malformed. */
export declare function parseChunkId(chunkId: string): {
    documentId: string;
    seq: number;
} | null;
/** One purge-verification run's identity, recorded in the purges table. */
export declare function purgeId(): string;
/**
 * One injection's identity: embedded in the injected marker text so the
 * model-visible message is reconstructable from the `library/inject` event.
 */
export declare function injectId(): string;
/** Domain record key of one document inside the `documents` table. */
export declare function documentKey(library: string, documentId: string): string;
/** Domain record key of one chunk inside the `chunks` table. */
export declare function chunkKey(library: string, chunkId: string): string;
//# sourceMappingURL=ids.d.ts.map