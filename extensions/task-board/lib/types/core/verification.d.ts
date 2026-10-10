/**
 * Goal acceptance domain: the board's evaluator-backed certification layer for
 * task executions that run in goal form.
 *
 * The board owns WHEN acceptance runs (the goal's completion gate), the
 * per-cycle budget, the feedback it returns, the settlement rule and the
 * report. The algorithm it runs is the DEFAULT final acceptance of the
 * installed `dsh-llm-verifier` 0.8.4 (MIT), mirrored here rather than imported:
 * that plugin is a third-party plugin, not a dependency of this repository, and
 * a host half may only depend on the official `@deepseek-ai/*` SDK.
 *
 * Mirrored contract, byte-identical where the judge prompt depends on it:
 * the three coding criteria of `DEFAULT_CRITERIA` (`CRITERIA_PRESETS.coding`),
 * the 20-letter A-T scale, the required `<score_A>`/`<score_B>` verdict tags,
 * the untrusted-evidence framing, `EMPTY_WORK_BASELINE` as candidate B, two
 * rounds per criterion with the A/B slots swapped on the odd round, per-round
 * scores mapped back to the caller's slots and averaged per criterion, and the
 * pass rule `winner === 'A' && total >= threshold && every criterion >= threshold`.
 *
 * This module is framework-free (no cordis, no SDK imports) so the whole rule
 * set is unit-testable in isolation; the model call itself lives in the host
 * half (`src/host/verification-runner.ts`).
 */
/** Schema version of the persisted verification block (per execution record). */
export declare const VERIFICATION_SCHEMA_VERSION: 1;
/** Acceptance threshold mirrored from the verifier's `autoVerifyThreshold` default. */
export declare const VERIFICATION_THRESHOLD = 0.65;
/** Rounds per criterion: the verifier's `autoVerifyFinalRepeats` default. */
export declare const VERIFICATION_ROUNDS = 2;
/**
 * Quality acceptances one goal completion cycle may spend: the first verdict,
 * then one re-verification after the agent repaired the work. A second failure
 * ends the cycle (see {@link MAX_EXCEPTION_ATTEMPTS} for the separate anomaly
 * budget).
 */
export declare const MAX_QUALITY_ATTEMPTS = 2;
/**
 * Anomaly budget of one cycle. A timeout, an authentication failure or an
 * unparseable judge answer is not a quality verdict, so it never consumes a
 * quality attempt; it is still bounded, so an unusable judge route can never
 * turn the completion gate into an unbounded retry loop.
 */
export declare const MAX_EXCEPTION_ATTEMPTS = 2;
/** The fixed baseline a session acceptance measures itself against. */
export declare const EMPTY_WORK_BASELINE = "(No useful work or verification was performed.)";
/** Ground-truth note prepended to every judge prompt. */
export declare const DEFAULT_GROUND_TRUTH_NOTE = "**IMPORTANT:** Focus on observed tool and terminal output as ground truth. Do NOT trust the agent's self-assessment or claims of success.";
/** Injected-content guardrail shared by every judge prompt. */
export declare const UNTRUSTED_EVIDENCE_NOTE: string;
/** Role sentence for a completed-artifact review of a coding task. */
export declare const EVALUATOR_ROLE = "You are an expert evaluator of AI coding agents. You will see a task description and two agent trajectories, then evaluate them on ONE specific criterion, stated at the end.";
/** The 20-point A-T scale, mirrored from the verifier. */
export declare const GRANULARITY = 20;
/** One criterion of the coding rubric. */
export interface VerificationCriterion {
    id: string;
    name: string;
    description: string;
}
/** The coding rubric, identical to the verifier's `DEFAULT_CRITERIA`. */
export declare const CODING_CRITERIA: readonly VerificationCriterion[];
/** Rating scale text rendered into every judge prompt. */
export declare const SCALE_DESCRIPTION: string;
/** A-T letters in scale order (A = best). */
export declare const LETTERS: readonly string[];
/**
 * Normalize one score token to an A-T letter.
 * @param token - the raw captured token.
 * @returns the uppercase letter, or undefined when it is not one of A-T.
 */
export declare function normalizeScoreLetter(token: string): string | undefined;
/** Numeric value of one A-T letter (A = 20 ... T = 1). */
export declare function letterValue(letter: string): number;
/**
 * Read the LAST `<tag> LETTER </tag>` verdict out of one judge answer.
 *
 * The tag contract is the verifier's explicit-tag channel: this deployment's
 * only scoring channel, because the official DSH adapters expose no token
 * logprobs (the verifier's direct top-logprob transport needs a capability the
 * public SDK does not carry). A missing or unusable tag is an exception, never
 * a score: the verdict stays fail-closed.
 * @param text - the raw judge answer.
 * @param tag - the tag name, e.g. `score_A`.
 * @returns the score in 0..1 (A = 1.0, T = 0.0).
 * @throws Error when the answer carries no valid A-T verdict for this tag.
 */
export declare function extractScore(text: string, tag: string): number;
/**
 * Render one untrusted content block with deterministic nonce-tagged delimiters.
 * @param tag - block tag.
 * @param token - content-derived delimiter token.
 * @param content - the untrusted content.
 * @returns the wrapped block.
 */
export declare function renderDelimitedBlock(tag: string, token: string, content: string): string;
/**
 * Deterministic per-prompt delimiter token (FNV-1a, same construction as the
 * verifier's). Not random: the token must depend on the whole content so that
 * identical inputs render an identical prompt while injected text cannot
 * predict the terminator.
 * @param parts - the content parts.
 * @returns a short base-36 token.
 */
export declare function evidenceNonce(...parts: readonly string[]): string;
/**
 * One pairwise judge prompt focused on a single criterion.
 *
 * Everything that does not depend on the criterion comes first and only the
 * criterion varies at the tail, so a prefix-caching backend serves the
 * evidence-heavy body from cache across the criteria of one acceptance.
 * @param problem - the task statement.
 * @param traceA - candidate A's trajectory.
 * @param traceB - candidate B's trajectory.
 * @param criterion - the criterion this call scores.
 * @param groundTruthNote - note prepended to every judge prompt.
 * @param context - optional reference context (the host's own record of what
 *   changed on disk), rendered as its own data-only block between the task and
 *   the two candidates. Omitted renders nothing, which keeps the prompt
 *   byte-identical for a deployment that serves no change service.
 * @returns the rendered prompt.
 */
export declare function buildAcceptancePrompt(problem: string, traceA: string, traceB: string, criterion: VerificationCriterion, groundTruthNote?: string, context?: string): string;
/** Where the judge route of one execution came from. */
export type VerificationRouteSource = 'inherit' | 'explicit';
/** The resolved judge route of one execution's acceptance. */
export interface VerificationRoute {
    provider: string;
    model: string;
    reasoningEffort?: string;
}
/** One reasoning-effort option an adapter exposes for an exact model route. */
export interface CatalogReasoningEffort {
    id: string;
    name?: string;
}
/** One adapter-discovered model of the host catalog. */
export interface CatalogModel {
    id: string;
    name?: string;
    reasoning?: {
        efforts: CatalogReasoningEffort[];
        defaultEffort?: string;
    };
}
/** One provider route and its models. */
export interface CatalogGroup {
    id: string;
    name?: string;
    models: CatalogModel[];
}
/** The host model catalog the acceptance settings resolve against. */
export interface ModelCatalogView {
    /** The route an unconfigured session starts at: the host's own configuration. */
    default?: VerificationRoute;
    groups: CatalogGroup[];
}
/** The acceptance settings as the configuration holds them. */
export interface VerificationSettings {
    enabled: boolean;
    /** Qualified provider/model route, or '' to inherit the host default. */
    model: string;
    /** Reasoning effort id, or '' to inherit. */
    reasoningEffort: string;
}
/** The acceptance configuration frozen when one execution started. */
export interface VerificationContract {
    /** Whether acceptance is required for this execution (the switch at start time). */
    enabled: boolean;
    /** Whether the judge model came from the host default or from configuration. */
    modelSource: VerificationRouteSource;
    /** Resolved judge route; absent when the deployment serves no model catalog. */
    route?: VerificationRoute;
    /** The reasoning effort configuration asked for, when it named one. */
    requestedEffort?: string;
    /**
     * Set when an explicitly configured reasoning effort is not supported by the
     * resolved model: the incompatible value is NOT sent, and the acceptance runs
     * on `resolved` (the model's own default when that is defined).
     */
    effortFallback?: {
        requested: string;
        resolved?: string;
    };
    /** Rubric preset. The first version always judges with the coding criteria. */
    preset: 'coding';
    /** Acceptance threshold frozen with the contract. */
    threshold: number;
}
/** One criterion's verdict inside an acceptance attempt. */
export interface VerificationCriterionScore {
    id: string;
    name: string;
    /** Score of the task's own work (0..1). */
    score: number;
    /** Score of the empty-work baseline in the same comparison. */
    baseline: number;
    threshold: number;
    passed: boolean;
}
/** Token accounting of one acceptance attempt. */
export interface VerificationUsage {
    calls: number;
    inputTokens: number;
    outputTokens: number;
    reasoningTokens: number;
    /** At least one call's usage was unknown; the counts are a floor. */
    usageIncomplete?: boolean;
}
/** Scope of the evidence one attempt judged. */
export interface VerificationEvidenceSummary {
    /** Characters handed to the judge after redaction. */
    chars: number;
    /** Characters dropped by the total cap (the newest text is kept). */
    omittedCharacters: number;
    /** Trace entries rendered. */
    entries: number;
    /** Sequence window the evidence was read from. */
    fromSeq?: number;
    toSeq?: number;
    /** Digest of the judged evidence; the pass record is bound to it. */
    hash: string;
    /** Files of host-observed workspace changes rendered into the prompt (0 = none). */
    workspaceFiles?: number;
}
/** One recorded acceptance attempt: a quality verdict or an anomaly. */
export interface VerificationAttempt {
    /** 1-based ordinal within its own stage. */
    index: number;
    /** When the attempt ran (ms epoch). */
    at: number;
    stage: 'quality' | 'exception';
    /** Quality: whether the work passed. A recorded anomaly is never a pass. */
    passed: boolean;
    /** Total score of the task's own work (0 for an anomaly). */
    score: number;
    /** Score of the empty-work baseline. */
    baseline: number;
    criteria: VerificationCriterionScore[];
    /** Bounded, locatable feedback for the agent. */
    findings: string[];
    usage: VerificationUsage;
    evidence: VerificationEvidenceSummary;
    route: VerificationRoute;
    /** Scoring channel that answered. This deployment serves explicit tags only. */
    channel: 'explicit-tag';
    rounds: number;
    /** Anomaly reason; absent on a quality verdict. */
    error?: string;
}
/** Persisted acceptance state of one execution. */
export interface ExecutionVerification {
    contract: VerificationContract;
    attempts: VerificationAttempt[];
    /** True while an acceptance is running, so the board can show an in-progress state. */
    inFlight?: boolean;
    /**
     * Why this execution may not settle as succeeded without a pass record:
     * `disabled` when the switch was off at start, `skipped` when the CARD opted
     * out of the gate (`TaskRecord.skipVerification`), `goal-unavailable` when
     * the run never became a goal run (so no completion gate could ever fire),
     * and `team-member` for a teammate execution (the Lead's acceptance covers
     * the team's aggregated evidence).
     */
    applicability: 'enforced' | 'disabled' | 'skipped' | 'goal-unavailable' | 'team-member';
    /** Set when the cycle is spent and the execution must fail. */
    failedReason?: string;
    failedAt?: number;
}
/** UI/board phase of one execution's acceptance. */
export type VerificationPhase = 'off' | 'executing' | 'verifying' | 'repairing' | 'passed' | 'failed';
/** Quality attempts spent by this cycle. */
export declare function qualityAttempts(verification: ExecutionVerification | undefined): VerificationAttempt[];
/** Anomaly attempts spent by this cycle. */
export declare function exceptionAttempts(verification: ExecutionVerification | undefined): VerificationAttempt[];
/** The quality attempt that passed, when one did. */
export declare function passedAttempt(verification: ExecutionVerification | undefined): VerificationAttempt | undefined;
/**
 * Whether the board requires a matching pass record before this execution may
 * settle as succeeded. False when acceptance was off at start, and false for a
 * run that never became a goal run or for a teammate execution — those settle
 * on their own verdict, which is why {@link ExecutionVerification.applicability}
 * is persisted rather than re-derived.
 * @param verification - the execution's persisted acceptance state.
 * @returns true when a pass record is required.
 */
export declare function verificationRequired(verification: ExecutionVerification | undefined): boolean;
/** Whether this cycle still has quality budget left. */
export declare function hasQualityBudget(verification: ExecutionVerification | undefined): boolean;
/** Whether this cycle still has anomaly budget left. */
export declare function hasExceptionBudget(verification: ExecutionVerification | undefined): boolean;
/** Derived board phase of one execution's acceptance. */
export declare function verificationPhase(verification: ExecutionVerification | undefined): VerificationPhase;
/**
 * The acceptance rule, mirrored from the verifier's `sessionAccepted`:
 * the work must BEAT the empty-work baseline, reach the total threshold, and
 * reach the threshold on every criterion. A tie or a loss against the baseline
 * fails, so a session indistinguishable from the baseline can never pass.
 * @param score - total score of the task's own work.
 * @param baseline - total score of the empty-work baseline.
 * @param criteria - per-criterion scores of the task's own work.
 * @param threshold - acceptance threshold.
 * @returns true when the work passes.
 */
export declare function acceptancePassed(score: number, baseline: number, criteria: readonly {
    score: number;
}[], threshold: number): boolean;
/**
 * Repair a persisted acceptance block, or drop it.
 *
 * Deliberately fail-soft on the FIELD and fail-closed on the VERDICT: a block
 * that does not parse is dropped (the execution keeps its own record, and the
 * board then treats the execution as unverified), while a block that does parse
 * keeps every recorded attempt verbatim. Dropping a malformed block can only
 * make the board MORE strict, never less.
 * @param value - the persisted value.
 * @returns the repaired block, or undefined when it is unusable.
 */
export declare function normalizeVerification(value: unknown): ExecutionVerification | undefined;
/** Totals spanning every attempt of one execution (for the report and the card). */
export interface VerificationTotals {
    quality: number;
    exceptions: number;
    calls: number;
    inputTokens: number;
    outputTokens: number;
    reasoningTokens: number;
    usageIncomplete: boolean;
}
/** Sum the attempts of one execution. */
export declare function verificationTotals(verification: ExecutionVerification | undefined): VerificationTotals;
/**
 * The failure feedback one acceptance returns to the fixing agent. It names
 * what failed, with the numbers, the locator lines the judge reported and the
 * remaining budget, so the next round can act on it instead of restating the
 * work.
 * @param attempt - the failed quality attempt.
 * @param remaining - quality attempts still available after this one.
 * @returns the model-facing feedback text.
 */
export declare function qualityFeedback(attempt: VerificationAttempt, remaining: number): string;
/**
 * The reason one exhausted acceptance cycle records as the execution's final
 * failure. Unlike {@link qualityFeedback} — which the fixing agent reads while
 * budget remains — this reason is also persisted on the ledger, echoed on every
 * later completion attempt and shown on the card, so it carries the full
 * picture: the scores, the baseline comparison, every failing criterion and the
 * judge's locatable findings, so a later agent (or the user) can act on WHAT to
 * improve, not only on how badly the attempt scored.
 * @param attempt - the failed quality attempt that spent the last budget.
 * @param used - quality attempts spent by the cycle.
 * @param threshold - the contract threshold the work was judged against.
 * @returns the model- and user-facing failure reason.
 */
export declare function finalFailureReason(attempt: VerificationAttempt, used: number, threshold: number): string;
/** `0.42` style percentage. */
export declare function percent(value: number): string;
/** Split a qualified `provider/model` route; undefined when it is not one. */
export declare function parseModelRoute(qualified: string | undefined): {
    provider: string;
    model: string;
} | undefined;
/**
 * Normalize the raw `session/modelCatalog` reply into the shape the acceptance
 * settings read. Everything is optional in the wire value, so every level is
 * checked: an unreadable catalog degrades to "unknown", never to a crash.
 * @param value - the raw gateway reply.
 * @returns the normalized catalog, or undefined when nothing usable arrived.
 */
export declare function normalizeCatalog(value: unknown): ModelCatalogView | undefined;
/** Whether the catalog declares the route at all. */
export declare function catalogHasRoute(catalog: ModelCatalogView | undefined, provider: string, model: string): boolean;
/**
 * Resolve the acceptance configuration into the contract one execution freezes.
 *
 * "Inherit host" means the host's own model catalog default, never the card's
 * pinned execution model. An explicitly configured reasoning effort is sent
 * ONLY when the target model's adapter declares it: an unsupported value is
 * dropped instead of being passed through, and the fallback to the target
 * model's own default is recorded so the settings card and the report can show
 * exactly what will be sent.
 * @param settings - the live configuration.
 * @param catalog - the host model catalog, when this cohort serves one.
 * @param threshold - acceptance threshold to freeze.
 * @returns the contract.
 */
export declare function resolveContract(settings: VerificationSettings, catalog: ModelCatalogView | undefined, threshold?: number): VerificationContract;
