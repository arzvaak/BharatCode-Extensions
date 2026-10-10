/**
 * Port of Retrieval-Diversity-Check (upstream/PerryLink, Apache-2.0): the
 * TF-IDF cosine duplicate scan (`check_diversity`) plus the maximal-marginal
 * relevance re-ranking that `library_search` applies to its hybrid-ranked
 * candidates. Pure functions — the upstream numpy/sklearn calls are replaced
 * by the shared token vocabulary.
 * @module dsh-library/quality/diversity
 */
/** One duplicate pair from {@link checkDiversity}. */
export interface DuplicatePair {
    readonly first: number;
    readonly second: number;
    readonly similarity: number;
}
/** The `check_diversity` result dictionary, ported 1:1. */
export interface DiversityReport {
    readonly totalTexts: number;
    readonly duplicateCount: number;
    /** Percentage of texts involved in at least one duplicate pair. */
    readonly tokenSavings: number;
    readonly duplicates: readonly DuplicatePair[];
    /** Row-major lower-triangle-free matrix of pairwise cosine similarities. */
    readonly similarityMatrix: readonly (readonly number[])[];
}
/**
 * Check a text list for near-duplicates — the upstream `check_diversity`.
 * TF-IDF-lite vectors share one token vocabulary; pairs whose cosine
 * similarity is STRICTLY above `threshold` are duplicates (upstream uses
 * `>`). Fewer than two texts throw, like upstream.
 * @param texts - the texts to compare.
 * @param threshold - similarity threshold (0..1).
 * @returns the diversity report.
 * @throws TypeError on fewer than two texts.
 */
export declare function checkDiversity(texts: readonly string[], threshold?: number): DiversityReport;
/** One re-rankable candidate: an item plus its relevance and pair similarity. */
export interface RerankCandidate {
    readonly id: string;
    /** Pre-existing relevance (hybrid score), used as the MMR relevance term. */
    readonly relevance: number;
    /** Pairwise similarity to one already-selected item. */
    similarityTo(other: RerankCandidate): number;
}
/**
 * Maximal marginal relevance over {@link RerankCandidate}s: greedily pick the
 * candidate maximizing `lambda * relevance - (1 - lambda) * maxSimilarity`.
 * `lambda = 1` is pure relevance order, `lambda = 0` pure diversity.
 * @param candidates - the ranked candidate pool.
 * @param lambda - relevance/diversity trade-off within 0..1.
 * @param topK - how many to pick.
 * @returns the picked candidates in selection order.
 */
export declare function maximalMarginalRelevance<T extends RerankCandidate>(candidates: readonly T[], lambda: number, topK: number): T[];
//# sourceMappingURL=diversity.d.ts.map