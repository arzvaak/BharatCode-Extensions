/**
 * Port of Lost-in-Middle-Tester (upstream/PerryLink, Apache-2.0): the probe
 * insertion and position statistics vocabulary, plus the avoidance strategy
 * that `library_search` applies to its retrieved list — the strongest chunks
 * are pinned to the head and tail of the context so the model never meets
 * the key evidence only in the middle.
 * @module dsh-library/quality/lost-middle
 */
/** One probe trial's outcome, mirroring the upstream `TestResult` shape. */
export interface ProbeResult {
    /** Relative insertion position within 0..1. */
    readonly position: number;
    readonly probe: string;
    readonly found: boolean;
}
/** Default probe prefix, mirroring the upstream `SECRET_CODE_` convention. */
export declare const PROBE_PREFIX = "SECRET_CODE_";
/**
 * Deterministic probe text for one trial. The upstream generator draws 4
 * random chars; here the caller supplies the suffix so tests replay.
 * @param suffix - the 4-character uppercase/digit suffix.
 * @returns the full probe string.
 */
export declare function makeProbe(suffix: string): string;
/**
 * Insert a probe sentence into one paragraph — the upstream
 * `PasswordInserter.insert`, deterministic instead of random.
 * @param paragraphs - the paragraph list.
 * @param position - relative position within 0..1 (clamped to the list).
 * @param probe - the probe string to insert.
 * @returns the modified list, the probe, and the insertion index.
 */
export declare function insertProbe(paragraphs: readonly string[], position: number, probe: string): {
    modified: string[];
    probe: string;
    index: number;
};
/** Per-position statistics, mirroring the upstream `ResultCollector`. */
export interface PositionStats {
    readonly successRate: number;
    readonly successCount: number;
    readonly totalCount: number;
}
/** Success counts keyed by position (the upstream statistics dictionary). */
export declare function successByPosition(results: readonly ProbeResult[]): Map<number, PositionStats>;
/**
 * The upstream prompt template used to test whether a model can surface a
 * probe at a given position.
 * @param document - the joined document text.
 * @returns the model prompt.
 */
export declare function buildProbePrompt(document: string): string;
/** One ranked item the avoidance strategy reorders. */
export interface RankedItem {
    readonly id: string;
    readonly score: number;
}
/**
 * Lost-in-the-middle avoidance: reorder a ranked list so the strongest items
 * sit at the head and the tail of the context window (the positions models
 * read most reliably), leaving the weakest in the middle. Within each zone
 * the score order is preserved.
 * @param ranked - the items ranked by score, descending.
 * @param head - how many strongest items to pin to the head.
 * @param tail - how many next-strongest items to pin to the tail.
 * @returns the reordered list (same length, same members).
 */
export declare function avoidLostMiddle(ranked: readonly RankedItem[], head: number, tail: number): RankedItem[];
/** One position bin of a middle-penalty report. */
export interface PositionBin {
    /** Inclusive relative start of the bin (0..1). */
    readonly start: number;
    /** Exclusive relative end of the bin (0..1). */
    readonly end: number;
    readonly count: number;
    readonly meanScore: number;
}
/**
 * Bin one ranked list by relative position and fold each bin's mean score —
 * the middle-penalty report: a score trough in the middle bins is the
 * lost-in-the-middle risk signal `library_diagnose` reports.
 * @param ranked - the items in their final context order.
 * @param bins - how many equal-width bins to use.
 * @returns one entry per bin.
 */
export declare function positionBins(ranked: readonly RankedItem[], bins: number): PositionBin[];
/**
 * The middle-penalty magnitude: how much the middle bins' mean score drops
 * below the best bin's mean. 0 means no penalty (flat distribution); larger
 * values mean strong content sits at the edges and weak content in the middle.
 * @param bins - a {@link positionBins} report.
 * @returns the penalty within 0..1, or 0 for an empty report.
 */
export declare function middlePenalty(bins: readonly PositionBin[]): number;
//# sourceMappingURL=lost-middle.d.ts.map