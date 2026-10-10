/**
 * Embedding pipeline: the built-in deterministic hash embedder (zero
 * downloads — word tokens plus character tri-grams hashed into a signed
 * bucket vector, L2-normalized), the optional external embedder command
 * protocol over `ctx.subprocess`, and the cosine/dot utilities the scoring
 * modules share.
 * @module dsh-library/embedding
 */
import type { SubprocessRuntime } from '@deepseek-ai/dsh-subprocess';
import type { ResolvedEmbeddingConfig } from './config.js';
/**
 * Embed one text with the built-in hash embedder. Each word token and each
 * character tri-gram hashes (FNV-1a) to a signed bucket: the index is the
 * hash modulo `dims` and the sign is the hash's high bit. The result is
 * L2-normalized so cosine similarity is a dot product.
 * @param text - input text.
 * @param dims - vector dimensionality (≥ 1).
 * @returns the normalized embedding as a plain number array.
 */
export declare function embedHash(text: string, dims: number): number[];
/**
 * Cosine similarity of two equal-length vectors (already-normalized vectors
 * make this a plain dot product, but the function normalizes anyway).
 * @param a - first vector.
 * @param b - second vector.
 * @returns similarity within 0..1 for non-negative-input vectors.
 */
export declare function cosine(a: readonly number[], b: readonly number[]): number;
/**
 * Run the configured external embedder command once over a text batch.
 * The protocol is JSON lines both ways: each stdin line is
 * `{"index": <n>, "text": "..."}` and each stdout line is
 * `{"index": <n>, "vector": [<number>, ...]}`. Every requested index must be
 * answered exactly once or the call fails closed (misconfiguration must
 * surface, not silently degrade retrieval).
 * @param subprocess - the mounted `ctx.subprocess` service.
 * @param argv - the configured command line split into argv (argv[0] = program).
 * @param cwd - working directory for the child.
 * @param texts - the texts to embed, in index order.
 * @param dims - expected vector dimensionality.
 * @param caps - timeout, grace, and output caps.
 * @returns embeddings in the same order as {@link texts}.
 * @throws Error on spawn failure, non-zero exit, or an incomplete/oversized answer.
 */
export declare function embedWithCommand(subprocess: SubprocessRuntime, argv: readonly string[], cwd: string, texts: readonly string[], dims: number, caps: {
    timeoutMs: number;
    graceMs: number;
    maxOutputBytes: number;
}): Promise<number[][]>;
/**
 * Split a flat command line into argv without shell interpretation.
 * Whitespace separates; quotes are NOT processed (documented: no shell).
 * @param command - the configured command string.
 * @returns the argv vector; an empty string yields an empty vector.
 */
export declare function splitCommandLine(command: string): string[];
/**
 * The embedder provider seam: one pluggable text→vector backend. The built-in
 * {@link HashEmbedder} is the zero-download default; {@link CommandEmbedder}
 * and {@link OllamaEmbedder} are optional backends (probe → use → degrade for
 * Ollama; fail loud for a configured-but-absent command).
 */
export interface Embedder {
    /** Provider name recorded alongside the index (hash | command | ollama). */
    readonly name: 'hash' | 'command' | 'ollama';
    /** Vector dimensionality this backend emits. */
    readonly dims: number;
    /**
     * Embed one batch of texts, returning one vector per input in the same order.
     * @param texts - the texts to embed.
     * @returns the L2-normalized embeddings.
     */
    embed(texts: readonly string[]): Promise<number[][]>;
}
/** Built-in deterministic hash embedder: zero downloads, pure local hashing. */
export declare class HashEmbedder implements Embedder {
    readonly dims: number;
    readonly name: "hash";
    /**
     * @param dims - vector dimensionality (≥ 1).
     */
    constructor(dims: number);
    embed(texts: readonly string[]): Promise<number[][]>;
}
/** External command embedder over the JSON-lines subprocess protocol. */
export declare class CommandEmbedder implements Embedder {
    private readonly subprocess;
    private readonly argv;
    private readonly cwd;
    readonly dims: number;
    private readonly caps;
    private readonly maxBatchItems;
    readonly name: "command";
    /**
     * @param subprocess - the mounted subprocess seam.
     * @param argv - the command line split into argv (argv[0] = program).
     * @param cwd - working directory for the child.
     * @param dims - expected vector dimensionality.
     * @param caps - timeout, grace, and output caps.
     * @param maxBatchItems - texts per subprocess invocation; larger batches split.
     */
    constructor(subprocess: SubprocessRuntime, argv: readonly string[], cwd: string, dims: number, caps: {
        timeoutMs: number;
        graceMs: number;
        maxOutputBytes: number;
    }, maxBatchItems: number);
    embed(texts: readonly string[]): Promise<number[][]>;
}
/**
 * Local Ollama embedder over the `/api/embed` endpoint. Zero cloud: the model
 * runs on a localhost Ollama server. A non-2xx response or a malformed vector
 * fails the batch (misconfiguration must surface, not silently degrade
 * retrieval); availability is probed up front by {@link probeOllama}.
 */
export declare class OllamaEmbedder implements Embedder {
    private readonly url;
    private readonly model;
    readonly dims: number;
    private readonly timeoutMs;
    private readonly maxBatchItems;
    readonly name: "ollama";
    /**
     * @param url - the Ollama base URL (e.g. `http://127.0.0.1:11434`).
     * @param model - the embedding model name (e.g. `nomic-embed-text`).
     * @param dims - the probed embedding dimensionality.
     * @param timeoutMs - per-request timeout.
     * @param maxBatchItems - texts per `/api/embed` call; larger batches split.
     */
    constructor(url: string, model: string, dims: number, timeoutMs: number, maxBatchItems: number);
    embed(texts: readonly string[]): Promise<number[][]>;
    /** POST one batch to `/api/embed` and validate the returned vectors. */
    private embedBatch;
}
/**
 * Probe a local Ollama server for one embedding model. Sends a single-word
 * probe through `/api/embed` and returns the model's vector dimensionality, or
 * undefined when the server is unreachable, the model is unknown, or the
 * response is malformed. Zero cloud — only the configured local URL is ever
 * contacted.
 * @param url - the Ollama base URL.
 * @param model - the embedding model name.
 * @param timeoutMs - probe timeout.
 * @returns the model's dimensionality, or undefined when unavailable.
 */
export declare function probeOllama(url: string, model: string, timeoutMs: number): Promise<number | undefined>;
/** The outcome of {@link resolveEmbedder}: the backend plus its degradation note. */
export interface EmbedderResolution {
    /** The resolved backend. */
    readonly embedder: Embedder;
    /** True when the configured backend was unavailable and a default was substituted. */
    readonly degraded: boolean;
    /** Human-readable degradation reason (present only when {@link EmbedderResolution.degraded}). */
    readonly reason?: string;
}
/**
 * Resolve the embedder backend from the resolved config: the configured
 * command wins (fail loud without a subprocess seam), the `ollama` provider is
 * probed and degrades gracefully to the built-in hash embedder when the server
 * is unreachable, and the built-in hash embedder is the zero-download default.
 * @param config - the resolved embedding config.
 * @param subprocess - the optional subprocess seam (command provider only).
 * @param cwd - working directory for the command provider.
 * @returns the backend plus its degradation note.
 */
export declare function resolveEmbedder(config: ResolvedEmbeddingConfig, subprocess: SubprocessRuntime | undefined, cwd: string): Promise<EmbedderResolution>;
//# sourceMappingURL=embedding.d.ts.map