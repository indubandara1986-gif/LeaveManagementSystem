// ─── useLeaveCalculator ───────────────────────────────────────────────────────
// Single Responsibility: owns date-range / day-count logic only.
// Components import this hook instead of duplicating the math.

export function useLeaveCalculator() {
  /**
   * Calculate working days between two ISO date strings (inclusive).
   * Currently counts all calendar days; extend here to skip weekends/holidays
   * without touching any UI component.
   */
  const calcDays = (from, to) => {
    if (!from || !to) return 0;
    const start = new Date(from);
    const end   = new Date(to);
    const diff  = Math.round((end - start) / 86400000) + 1;
    return Math.max(0, diff);
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  return { calcDays, formatDate };
}
