/**
 * Board-owned variant of the family plugin-card seat that can declare child
 * slots on the registration.
 *
 * The shared `installPluginCard` helper owns seat selection but cannot forward
 * a `children` declaration, and the task board's settings card declares the
 * `task-board.settings.section` seat a provider renders into. This wrapper
 * reuses the shared seat decision (`familyGroupLoaded` and the two seat keys)
 * and adds the declaration; it should collapse back into the shared helper once
 * that helper accepts children.
 *
 * @module dsh-task-board/client/board-card-seat
 */
import { type PluginCardContext } from './plugin-card-seat.ts';
/** One board card contribution, with the child seats it declares. */
export interface BoardCardSeat {
    bundle: string;
    id: string;
    order?: number;
    label?: () => string;
    locale: string;
    /** Child slots this entry declares and renders. */
    children: Record<string, unknown>;
    inject?: () => object;
    component: unknown;
}
/**
 * Contribute the board's settings card to the seat this host renders, declaring
 * the child slots it owns. Mirrors the shared helper's reconcile discipline: the
 * entry moves when the family group appears, and is never in two seats at once.
 * @param ctx - client context (its slot registry decides the seat).
 * @param seat - the card contribution and its children declaration.
 */
export declare function installBoardCard(ctx: PluginCardContext, seat: BoardCardSeat): void;
