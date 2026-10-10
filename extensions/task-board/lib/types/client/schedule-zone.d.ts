/** One selectable zone, in the order the picker shows it. */
export interface ZoneChoice {
    /** Canonical IANA id, or `''` for the Host-zone entry. */
    id: string;
    /** Display label. */
    label: string;
}
/**
 * Zones offered by the picker: the Host zone first (the default, and the entry
 * a rule with no stored zone follows), then the runtime's own inventory.
 *
 * The Host entry is always present, even before the Host snapshot reports a
 * zone: it is the entry that stores no zone, so dropping it would leave a rule
 * unable to express "follow the Host" and would let the control silently
 * display an unrelated zone.
 *
 * A stored zone the inventory does not list (a rule written on another machine
 * or under a different ICU build) is appended, so opening the editor can never
 * silently rewrite the rule's zone.
 * @param hostTimeZone - zone the Host reported for this deployment, when known.
 * @param storedTimeZone - zone the edited rule already stores, when any.
 * @returns the de-duplicated choice list.
 */
export declare function zoneChoices(hostTimeZone: string | undefined, storedTimeZone?: string): ZoneChoice[];
/**
 * The relative half of a next-run label: how far away the instant is, or how
 * far past it the board is running. `now` is passed in rather than sampled so
 * callers can share one clock reading across a row, and tests stay
 * deterministic.
 * @param targetMs - the instant being described.
 * @param now - the reference instant.
 * @returns localized relative wording.
 */
export declare function relativeTimeLabel(targetMs: number, now: number): string;
/**
 * The full next-run label: the absolute wall clock in the schedule's own zone,
 * plus the relative distance in parentheses. Showing both matters because a
 * rule's zone can differ from the reader's, so the wall clock alone is
 * ambiguous and the distance alone loses the actual moment.
 * @param targetMs - the instant being described.
 * @param timeZone - zone to render the absolute half in.
 * @param formatAbsolute - formatter for the absolute half (keeps Intl caching in the caller).
 * @param now - the reference instant.
 * @param translate - translate function, bound so this module stays dependency-light.
 * @returns the combined label.
 */
export declare function nextRunLabel(targetMs: number, timeZone: string | undefined, formatAbsolute: (ms: number, timeZone?: string) => string, now: number): string;
