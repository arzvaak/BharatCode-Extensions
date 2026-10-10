/**
 * Port of Citation-Validator-Lite (upstream/PerryLink, Apache-2.0): citation
 * extraction (`[n]` markers), sentence-bounded claim windows, and fuzzy
 * validation against the cited source. The upstream `fuzzywuzzy`
 * `partial_ratio` is reimplemented as a bounded token-sequence partial ratio
 * (zero dependencies) — the shorter text slides over every token window of
 * the longer one and the best ratio wins, matching the upstream semantics.
 * @module dsh-library/quality/citation
 */
/** One citation match — the upstream `CitationMatch` dataclass. */
export interface CitationMatch {
    readonly number: string;
    readonly context: string;
    readonly is_valid: boolean;
    /** Fuzzy score 0..100. */
    readonly score: number;
    readonly start_pos: number;
    readonly end_pos: number;
    readonly reason: string;
}
/** The whole validation result — the upstream `ValidationResult` dataclass. */
export interface ValidationResult {
    readonly results: readonly CitationMatch[];
    readonly threshold: number;
}
/**
 * Extract every `[<digits>]` citation marker as (number, start, end) — the
 * upstream `extract_citations` (`r'\[(\d+)\]'`).
 * @param text - the answer text.
 * @returns the markers in scan order.
 */
export declare function extractCitationNumbers(text: string): Array<{
    number: string;
    start: number;
    end: number;
}>;
/**
 * Extract the sentence around a citation position — the upstream
 * `extract_sentence_with_citation`: scan backwards to the nearest sentence
 * ending (`.`, `!`, `?`, newline) and forwards the same way, bounded by the
 * window.
 * @param text - the answer text.
 * @param citationPos - the citation marker position.
 * @param window - maximum half-window in characters.
 * @returns the trimmed sentence context.
 */
export declare function extractSentenceWithCitation(text: string, citationPos: number, window?: number): string;
/**
 * Bounded port of `fuzz.partial_ratio`: the best sequence ratio between one
 * text and every token window of the other. Both sides are token-capped so
 * hostilely long sources stay within a fixed quadratic budget.
 * @param claim - the claim text.
 * @param source - the source text.
 * @returns the best ratio as a 0..100 integer score.
 */
export declare function fuzzyPartialRatio(claim: string, source: string): number;
/**
 * Validate one citation claim against its source — the upstream
 * `validate_citation` (`fuzz.partial_ratio(claim, source) >= threshold`).
 * @param claim - the claim context.
 * @param source - the cited source text.
 * @param threshold - pass score (0..100).
 * @returns `[isValid, score]`.
 */
export declare function validateCitation(claim: string, source: string, threshold?: number): [boolean, number];
/**
 * Validate every citation in an answer — the upstream `validate_citations`.
 * Unknown source numbers are invalid with score 0 and reason
 * "Source not found"; low scores carry a "Low match score: N%" reason.
 * @param answer - the answer text with `[n]` markers.
 * @param sources - source text keyed by citation number.
 * @param threshold - pass score (0..100).
 * @returns the validation result.
 */
export declare function validateCitations(answer: string, sources: Readonly<Record<string, string>>, threshold?: number): ValidationResult;
//# sourceMappingURL=citation.d.ts.map