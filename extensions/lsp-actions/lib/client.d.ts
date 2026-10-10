/**
 * The plugin's own minimal LSP action client — the fallback for compositions where the official
 * `ctx.lsp` seam does not serve action operations yet. One server process per (server entry,
 * canonical workspace), lazily spawned and serialized; each document runs a resident
 * didOpen→(didChange)→… lifecycle (open once, kept open until process teardown) so project-based
 * servers like typescript-language-server keep serving signatureHelp and document-free
 * workspace/symbol instead of answering null on a document that was just closed. See
 * `docs/seam-extension-notes.md` for the migration story to the official seam.
 * @module dsh-lsp-actions/client
 */
import type { FileSystem } from '@deepseek-ai/dsh-fs';
import type { Context } from '@deepseek-ai/cordis';
import type { HostSource } from './host.js';
import type { LspCodeActionsResult, LspCompletionResult, LspDiagnosticsResult, LspEditsResult, LspInlayHintsResult, LspPosition, LspRange, LspRenameResult, LspSignaturesResult, LspSymbolsResult } from './vocabulary.js';
import type { ResolvedServer } from './servers.js';
/** One action call as the client receives it: everything the tool already knows. */
export interface ActionRequest {
    /** The source file (relative to `workspaceRoot` or absolute). */
    readonly filePath: string;
    /** The workspace root the client resolves against and indexes. */
    readonly workspaceRoot: string;
    /** The pre-read, byte-capped source the didOpen synchronizes with the server. */
    readonly source: HostSource;
    /** The LSP language id for `filePath`, from the routed server's extension mapping. */
    readonly languageId: string;
    /** The cursor position, for completion and signature help. */
    readonly position?: LspPosition;
    /** The formatting/code-action/inlay-hint range, when the caller narrowed it. */
    readonly range?: LspRange;
    /** CodeActionKind filters for code actions (e.g. `quickfix`). */
    readonly onlyKinds?: readonly string[];
}
/**
 * Pooled minimal LSP action client. Instances are single-flight per canonical workspace and are
 * evicted as soon as they die; every await observes cancellation.
 */
export declare class LspActionClient {
    private readonly subprocess;
    private readonly fs;
    /** Byte cap for documents the rename flow reads back to decode cross-file positions. */
    private readonly maxDocumentBytes;
    private readonly instances;
    private readonly lifetime;
    private disposed;
    constructor(subprocess: Context['subprocess'], fs: FileSystem, 
    /** Byte cap for documents the rename flow reads back to decode cross-file positions. */
    maxDocumentBytes?: number);
    /** Spawn one connection through the subprocess seam (the real provider at runtime). */
    private readonly spawner;
    /**
     * Run the diagnostics action through the routed server.
     * @param server - the routed server entry.
     * @param request - the action request.
     * @param signal - optional cancellation.
     * @returns the normalized diagnostics result.
     */
    diagnostics(server: ResolvedServer, request: ActionRequest, signal?: AbortSignal): Promise<LspDiagnosticsResult>;
    /**
     * Run the formatting action through the routed server; the client only RETURNS edits, it never
     * writes files — the tool applies them through `ctx.fs` write-intent.
     * @param server - the routed server entry.
     * @param request - the action request (carries the optional range).
     * @param signal - optional cancellation.
     * @returns the normalized edits result.
     */
    formatDocument(server: ResolvedServer, request: ActionRequest, signal?: AbortSignal): Promise<LspEditsResult>;
    /**
     * Run the completion action through the routed server.
     * @param server - the routed server entry.
     * @param request - the action request (carries the cursor position).
     * @param signal - optional cancellation.
     * @returns the normalized completion result.
     */
    completion(server: ResolvedServer, request: ActionRequest, signal?: AbortSignal): Promise<LspCompletionResult>;
    /**
     * Run the code actions action through the routed server; the client only REPORTS edits and
     * commands, it never applies them — applying one is the model's own write/edit decision.
     * @param server - the routed server entry.
     * @param request - the action request (carries the optional range and kind filters).
     * @param signal - optional cancellation.
     * @returns the normalized code actions result.
     */
    codeActions(server: ResolvedServer, request: ActionRequest, signal?: AbortSignal): Promise<LspCodeActionsResult>;
    /**
     * Run a workspace-wide symbol search through the routed server (no document involved).
     * @param server - the routed server entry.
     * @param workspaceRoot - the workspace to search.
     * @param query - the symbol name query.
     * @param signal - optional cancellation.
     * @returns the normalized symbols result.
     */
    workspaceSymbols(server: ResolvedServer, workspaceRoot: string, query: string, signal?: AbortSignal): Promise<LspSymbolsResult>;
    /**
     * Run a workspace-wide symbol search with one document kept open: project-based servers (tsls)
     * refuse document-free `workspace/symbol`, so the routing file stays transiently open for the
     * request and closes afterwards.
     * @param server - the routed server entry.
     * @param request - the action request (whose source is kept open during the search).
     * @param query - the symbol name query.
     * @param signal - optional cancellation.
     * @returns the normalized symbols result.
     */
    workspaceSymbolsInDocument(server: ResolvedServer, request: ActionRequest, query: string, signal?: AbortSignal): Promise<LspSymbolsResult>;
    /**
     * Run a document symbol listing through the routed server.
     * @param server - the routed server entry.
     * @param request - the action request.
     * @param signal - optional cancellation.
     * @returns the normalized symbols result.
     */
    documentSymbols(server: ResolvedServer, request: ActionRequest, signal?: AbortSignal): Promise<LspSymbolsResult>;
    /**
     * Run signature help through the routed server.
     * @param server - the routed server entry.
     * @param request - the action request (carries the cursor position).
     * @param signal - optional cancellation.
     * @returns the normalized signatures result.
     */
    signatureHelp(server: ResolvedServer, request: ActionRequest, signal?: AbortSignal): Promise<LspSignaturesResult>;
    /**
     * Run inlay hints through the routed server.
     * @param server - the routed server entry.
     * @param request - the action request (carries the optional range).
     * @param signal - optional cancellation.
     * @returns the normalized inlay hints result.
     */
    inlayHints(server: ResolvedServer, request: ActionRequest, signal?: AbortSignal): Promise<LspInlayHintsResult>;
    /**
     * Run a symbol rename through the routed server; the client only RETURNS the grouped edits, it
     * never writes files — the tool applies them through `ctx.fs` write-intent. Cross-document
     * positions are decoded per document (reading the target text for non-utf-16 servers), so the
     * returned edits are utf-16 for every document.
     * @param server - the routed server entry.
     * @param request - the action request (carries the cursor position).
     * @param newName - the new symbol name.
     * @param signal - optional cancellation.
     * @returns the normalized, decoded rename result.
     */
    rename(server: ResolvedServer, request: ActionRequest, newName: string, signal?: AbortSignal): Promise<LspRenameResult>;
    /** Disposed flag through a method so an await cannot narrow it to a literal. */
    private isDisposed;
    /** Reject work that cannot publish or use a client-owned instance. */
    private assertActive;
    /** Fuse caller cancellation with client disposal for every filesystem and protocol await. */
    private querySignal;
    private run;
    /** The document-free sibling of {@link run}: serves workspace-scoped actions (symbol search). */
    private runBare;
    /** Serialize and run one action attempt pair (retry-once included) for a canonical workspace. */
    private runScoped;
    /** One attempt: publish/borrow the instance, run the action, evict the dead, arm the idle timer. */
    private runOnce;
    /** Idle-eviction timers per workspace key; a use resets, a fire disposes and evicts. */
    private readonly idleTimers;
    private armIdleTimer;
    private clearIdleTimer;
    /** Serialize one complete action lifecycle per canonical workspace. */
    private enqueue;
    /** The serialization tail for one workspace key (per-instance queues live on the instance). */
    private tails;
    private tailFor;
    private setTail;
    /** Return or synchronously publish the one instance for a canonical workspace. */
    private instanceFor;
    /** Dispose every live instance and block further actions. */
    disposeAll(): Promise<void>;
    /**
     * Decode one rename's grouped wire edits into utf-16, per document: the origin document uses
     * the source text the server saw; any other document is read back for its codec (utf-16 servers
     * need no read — their positions are already utf-16). An unreadable or out-of-workspace target
     * on a non-utf-16 server is a structured conflict, never silently mis-decoded positions.
     */
    private decodeRenameEdits;
}
//# sourceMappingURL=client.d.ts.map