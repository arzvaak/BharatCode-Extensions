/**
 * Goal acceptance gate: the board's evaluator-backed certification of a goal
 * completion claim.
 *
 * The gate sits on the official tool pre-execute lifecycle and intercepts the
 * one call that ends a goal run — `update_goal` with `action: 'complete'`
 * — BEFORE it takes effect. This is why the board does not ask the agent to
 * verify itself: the tool call that finishes the goal is refused until a
 * matching acceptance pass record exists, so no prompt wording and no
 * self-report can route around it.
 *
 * Semantics owned here:
 * - one acceptance cycle per EXECUTION, spent at most twice: the first failure
 *   returns its findings to the fixing agent, the second ends the cycle;
 * - a repeated completion call during a repair, a new automatic goal round, a
 *   plugin reload and a Host restart all reuse the same cycle rather than
 *   resetting it (the budget is persisted on the execution record);
 * - an anomaly (timeout, authentication, unparseable answer, an unusable judge
 *   route) is recorded separately from a quality verdict and is never treated
 *   as one;
 * - concurrent completion calls for one execution share one acceptance.
 */
import type { PreToolDecision } from '@deepseek-ai/dsh-tools';
import type { LlmRuntime } from '@deepseek-ai/dsh-llm';
import { type WorkspaceChangeSource } from './workspace-evidence.ts';
import type { HostTaskLedger } from '../host-ledger.ts';
/** The subset of the official goal service this gate drives. */
export interface GoalFace {
    get(agent: unknown): {
        id: string;
        revision: number;
        objective: string;
    } | undefined;
    block(agent: unknown, ref: {
        id: string;
        revision: number;
    }, reason: {
        code: string;
        message: string;
    }): unknown;
}
/** Everything the gate needs from its owner. */
export interface GoalVerificationGateDeps {
    ledger: HostTaskLedger;
    /** Resolve the optional model runtime lazily (it may activate later). */
    llm?: () => LlmRuntime | undefined;
    /** Resolve the optional goal service lazily. */
    goals?: () => GoalFace | undefined;
    /**
     * Resolve the optional host change service lazily. Absent (or a deployment
     * that serves none) simply means the judge sees the trajectory alone.
     */
    workspaceChanges?: () => WorkspaceChangeSource | undefined;
    logger: {
        warn(message: string, ...rest: unknown[]): void;
    };
    now?: () => number;
}
/** The shape of one tool pre-execution the gate inspects. */
export interface GateExecution {
    name: string;
    arguments: unknown;
    agent?: unknown;
    signal: AbortSignal;
}
/**
 * Create the goal acceptance gate.
 * @param deps - the ledger, the model runtime, the goal service and the settings.
 * @returns the `tools/pre-execute` listener body (without the waterfall next()).
 */
export declare function createGoalVerificationGate(deps: GoalVerificationGateDeps): (exec: GateExecution) => Promise<PreToolDecision | undefined>;
