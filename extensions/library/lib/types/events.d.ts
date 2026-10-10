/**
 * Session audit events for dsh-library (declaration merging into the harness's
 * `SessionEventMap`) and the adaptive append gate. Both events are log-only;
 * tool arguments and rendered results are already logged by the tool runtime
 * as `tool/call` + `tool/result`, and these events carry the audit facts that
 * exist outside them: the inject id linking the injected marker text back to
 * the search that produced it, and each purge-verification verdict.
 *
 * The gate appends only when the host can carry the events safely, and the
 * host's capability is OBSERVED at mount time rather than inferred from an
 * append implementation's source text:
 * - hosts whose known-type set covers the vocabulary append plainly;
 * - hosts observed to stamp the `ignorable` envelope (see
 *   {@link probeMarkerSupport}) append with the marker, so builds that do not
 *   know the type skip the event on restore;
 * - every other host — envelope-less builds such as 0.1.0-rc.6/rc.8,
 *   0.1.1-rc.2 and the 0.1.2-alpha line, which fails closed on unknown types at
 *   read, and the 0.1.6-alpha.2 line, whose third append parameter is a
 *   `SurfaceIntent` that exists only for surface-eligible types — gets no
 *   append, with one visible warning instead of a silent skip; the tool
 *   results remain the reconstructable audit trail.
 *
 * @module dsh-library/events
 */
import { type Session } from '@deepseek-ai/dsh-session';
declare module '@deepseek-ai/dsh-session/types' {
    interface SessionEventMap {
        /** One `library_search` injection: id links the injected marker text back to this event. */
        'library/inject': LibraryInjectEvent;
        /** One `library_remove` purge verification outcome. */
        'library/purge': LibraryPurgeEvent;
    }
}
/** The `library_search` injection audit payload. */
export interface LibraryInjectEvent {
    /** Inject id carried by the injected marker text. */
    injectId: string;
    /** Library the search ran against. */
    library: string;
    /** The search query. */
    query: string;
    /** Chunk ids of the injected result page. */
    chunks: string[];
    /** Injected page length in characters (after the budget cap). */
    chars: number;
}
/** The `library_remove` purge-verification audit payload. */
export interface LibraryPurgeEvent {
    /** Purge probe run id. */
    purgeId: string;
    /** Library the document was removed from. */
    library: string;
    /** Removed document id. */
    documentId: string;
    /** Whether the purge probes found no residue. */
    passed: boolean;
    /** Residue hits found by the purge probes. */
    totalFound: number;
}
/** The injection audit event type. */
export declare const INJECT_EVENT: "library/inject";
/** The purge audit event type. */
export declare const PURGE_EVENT: "library/purge";
/** The observed marker capability of the mounted host. */
export type MarkerSupport = 'unknown' | 'supported' | 'unsupported';
/** The outcome of one audit append attempt. */
export type AuditAppendOutcome = 'appended' | 'appended-marked' | 'skipped-unmarked-host';
/** Adopt the probed verdict (called once by `apply`; tests inject it directly). */
export declare function adoptMarkerSupport(verdict: MarkerSupport): void;
/**
 * Observe whether this host stamps the `ignorable` envelope, by appending one
 * audit event on a scratch session and reading the returned record back. The
 * judgement is observed rather than inferred from an append implementation's
 * source text (a source-text probe cannot see through a wrapper, a minifier or
 * a future options bag), and it is safe: the scratch session is discarded, so
 * an unmarked write there harms nothing.
 *
 * Folded context: `Session.append` optionally returns the appended record; a
 * host that honours `{ ignorable: true }` returns it with `ignorable === true`,
 * one that drops the options bag returns a record without the field, and a
 * host that rejects the type outright throws — all three map to a verdict, and
 * anything ambiguous or throwing fails closed to `'unsupported'`.
 * @param createSession - builds the throwaway session to probe with.
 * @returns the observed capability.
 */
export declare function probeMarkerSupport(createSession: () => Session): Promise<MarkerSupport>;
/**
 * Append one dsh-library audit event when the host can carry it safely, and
 * report what happened instead of skipping silently (the `tool/call` +
 * `tool/result` events remain the model-visible log either way). The full rule
 * set lives in the module doc; in short: known-vocabulary hosts append
 * plainly, hosts observed to stamp the `ignorable` envelope append with the
 * marker, and every other host gets no append plus one visible warning.
 * @param session - the calling session.
 * @param type - the audit event type.
 * @param data - the audit payload.
 * @returns which branch ran.
 */
export declare function appendAuditEvent(session: Session, type: typeof INJECT_EVENT | typeof PURGE_EVENT, data: LibraryInjectEvent | LibraryPurgeEvent): AuditAppendOutcome;
//# sourceMappingURL=events.d.ts.map