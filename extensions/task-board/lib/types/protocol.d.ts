import type { TaskUpdatePatch } from './core/use-cases/task-update.ts';
import { type NewTaskInput, type TaskPermission, type TaskRecord, type TaskStatus } from './core/tasks.ts';
import { type TaskBoardExtensionPayload } from './core/extension.ts';
import { type ModelCatalogView, type VerificationContract, type VerificationSettings } from './core/verification.ts';
export declare const TASK_BOARD_SCHEMA_VERSION: 5;
/** Ledger documents written before v5; loaded once and migrated on startup. */
export declare const TASK_BOARD_LEGACY_SCHEMA_VERSION: 4;
/** Ledger documents written before v4; migrated through the v4 normalization too. */
export declare const TASK_BOARD_OLDER_SCHEMA_VERSION: 3;
/** Ledger documents written before v3; migrated through every later normalization too. */
export declare const TASK_BOARD_OLDEST_SCHEMA_VERSION: 2;
/**
 * Every older generation the loader migrates in place. v5 only ADDS the
 * per-execution acceptance block, so the migration is the normalization pass
 * that re-validates each row; a document from any listed generation upgrades
 * losslessly.
 */
export declare const TASK_BOARD_MIGRATABLE_SCHEMA_VERSIONS: readonly number[];
export declare const TASK_BOARD_API_PREFIX = "/api/task-board";
export type PowerPhase = 'disabled' | 'idle' | 'acquiring' | 'active' | 'error' | 'unsupported';
export interface TaskBoardPowerSnapshot {
    platform: string;
    phase: PowerPhase;
    enabled: boolean;
    runningSessions: number;
    armedSchedules: number;
    sessionStateKnown: boolean;
    lastError?: string;
}
export interface TaskBoardSchedulerSnapshot {
    timeZone: string;
    /** Opaque identity of the current Host ledger generation. */
    ledgerId?: string;
    lastTickAt?: number;
    error?: string;
}
export interface TaskBoardSnapshot {
    schemaVersion: typeof TASK_BOARD_SCHEMA_VERSION;
    revision: number;
    tasks: TaskRecord[];
    scheduler: TaskBoardSchedulerSnapshot;
    power: TaskBoardPowerSnapshot;
    /** Session-default permission the confirmation gate compares against. */
    sessionDefaultPermission?: TaskPermission;
    /**
     * Deployment subtask depth limit (1..3). The browser mirrors it to enable or
     * disable the subtask controls; the Host ledger is the authority.
     */
    maxSubtaskDepth?: number;
    /**
     * Whether this deployment serves the Agent Teams service, so a task may opt
     * into team execution (Team Lead session plus one teammate per subtask).
     */
    teamRunAvailable?: boolean;
    /**
     * Read-only summaries published by running extensions, keyed by extension id.
     * The board forwards them verbatim; it never interprets their shape.
     */
    extensions?: Record<string, unknown>;
}
/**
 * Body of `GET {TASK_BOARD_API_PREFIX}/verification`: the acceptance settings the
 * card edits, the contract they resolve to right now, and the host model catalog
 * the model and reasoning choices come from. Served through the same loopback /
 * authenticated-proxy guard as the rest of the board API, and it carries no
 * credential material — model routes and level ids only.
 */
export interface TaskBoardVerificationOptions {
    settings: VerificationSettings;
    /** The RESOLVED contract, so the card can show what the next execution freezes. */
    contract: VerificationContract;
    catalog: ModelCatalogView;
}
/** SSE event frame: revision/scheduler/power only, never the task list. */
export interface TaskBoardEventPayload {
    revision: number;
    scheduler: TaskBoardSchedulerSnapshot;
    power: TaskBoardPowerSnapshot;
}
/**
 * Request body of `POST {TASK_BOARD_API_PREFIX}/parse` (issue #1540): the text
 * the user pasted plus the `provider/model` route that should parse it.
 */
export interface TaskBoardParseRequest {
    text: string;
    /** Qualified route from the model picker; absent when no route was chosen. */
    model?: string;
}
/** Draft fields a parse returns; the user reviews them before creating the task. */
export interface TaskBoardParseDraft {
    title: string;
    description: string;
    prompt: string;
}
/** Strict parse of a `/parse` request body; undefined rejects the request. */
export declare function parseTaskParseRequest(value: unknown): TaskBoardParseRequest | undefined;
/** Whether a decoded reply carries the three draft strings the form accepts. */
export declare function isTaskParseDraft(value: unknown): value is TaskBoardParseDraft;
export type TaskBoardAction = {
    kind: 'import';
    sourceId: string;
    tasks: TaskRecord[];
} | {
    kind: 'create';
    id: string;
    input: NewTaskInput;
} | {
    kind: 'update';
    taskId: string;
    patch: TaskUpdatePatch;
} | {
    kind: 'delete';
    taskId: string;
} | {
    kind: 'move';
    taskId: string;
    status: TaskStatus;
} | {
    kind: 'archive';
    taskId: string;
} | {
    kind: 'restore';
    taskId: string;
} | {
    kind: 'settle';
    taskId: string;
} | {
    kind: 'set-schedule';
    taskId: string;
    patch: {
        enabled?: boolean;
        cron?: string;
        timeZone?: string | null;
    };
} | {
    kind: 'run';
    taskId: string;
} | {
    kind: 'rerun';
    taskId: string;
} | {
    kind: 'confirm-permission';
    taskId: string;
} | {
    kind: 'set-parent';
    taskId: string;
    parentId: string | null;
}
/** Ledger-wide label management; see core/use-cases/task-tag.ts. */
 | {
    kind: 'rename-tag';
    from: string;
    to: string;
} | {
    kind: 'delete-tag';
    name: string;
} | {
    kind: 'extension-action';
    extensionId: string;
    action: string;
    taskId?: string;
    payload?: TaskBoardExtensionPayload;
};
export interface TaskBoardActionEnvelope {
    requestId: string;
    action: TaskBoardAction;
    /**
     * Session id of the DSH session issuing the action, for the execution audit
     * trail (issue #6). Client-asserted, not a trust boundary; parsed only as a
     * bounded non-empty string and recorded on opened executions / freeze stamps.
     */
    initiator?: string;
}
export declare function parseActionEnvelope(value: unknown): TaskBoardActionEnvelope | undefined;
