/**
 * Shared text utilities for the quality modules: tokenization, term
 * frequencies, and n-gram windows. Pure and deterministic — every scoring
 * module builds on this vocabulary.
 * @module dsh-library/text
 */
/**
 * Normalize prose for scoring: lowercase and collapse whitespace.
 * Does NOT strip punctuation (token boundaries still cut on it).
 * @param text - input text.
 * @returns the normalized text.
 */
export declare function normalize(text: string): string;
/**
 * Tokenize into lowercase word tokens. ASCII words keep their boundaries;
 * every other run of letters counts as one token so CJK text still scores.
 * @param text - input text.
 * @returns the token list.
 */
export declare function tokenize(text: string): string[];
/**
 * CJK-aware scoring tokenization: like {@link tokenize}, but every CJK run
 * contributes its unigrams plus its adjacent bigrams, so a query and a
 * document overlap on sub-phrases instead of only on identical whole runs.
 * @param text - input text.
 * @returns the expanded token list.
 */
export declare function cjkTokenize(text: string): string[];
/** Deduplicated token set of one text. */
export declare function tokenSet(text: string): ReadonlySet<string>;
/**
 * Term-frequency map of a token list: token → occurrence count.
 * @param tokens - the token list.
 * @returns the frequency map (plain object, no prototype).
 */
export declare function termFrequenciesOf(tokens: readonly string[]): Record<string, number>;
/**
 * Term-frequency map of one text: token → occurrence count.
 * @param text - input text.
 * @returns the frequency map (plain object, no prototype).
 */
export declare function termFrequencies(text: string): Record<string, number>;
/**
 * Character n-grams of a normalized text, for the built-in hash embedder.
 * A space-padded form adds leading/trailing boundary markers so prefixes and
 * suffixes still contribute.
 * @param text - input text.
 * @param n - n-gram width.
 * @returns the n-gram array.
 */
export declare function charNGrams(text: string, n: number): string[];
/**
 * Token n-grams of a tokenized text (the purge signature vocabulary).
 * @param tokens - token list from {@link tokenize}.
 * @param n - n-gram width.
 * @returns n-gram tokens joined by spaces, deduplicated.
 */
export declare function tokenNGrams(tokens: readonly string[], n: number): string[];
/**
 * FNV-1a 32-bit string hash — the deterministic bucket of the hash embedder.
 * @param text - string to hash.
 * @returns an unsigned 32-bit integer.
 */
export declare function fnv1a(text: string): number;
//# sourceMappingURL=text.d.ts.map