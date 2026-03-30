import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Avatar, Badge, LeaveChip } from "../components/Atoms";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// ─── CalendarGrid ─────────────────────────────────────────────────────────────
// Single Responsibility: renders the month grid only.

function CalendarGrid({ year, month, leaveDates }) {
  const firstDay     = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const prevMonthEnd = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++)
    cells.push({ day: prevMonthEnd - firstDay + i + 1, otherMonth: true });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d });
  const rem = 42 - cells.length;
  for (let i = 1; i <= rem; i++)
    cells.push({ day: i, otherMonth: true });

  return (
    <div>
      <div className="cal-grid" style={{ marginBottom: 8 }}>
        {DAY_NAMES.map((d) => (
          <div key={d} className="cal-day-header">{d}</div>
        ))}
      </div>
      <div className="cal-grid">
        {cells.map((c, i) => {
          const status = !c.otherMonth ? leaveDates[c.day] : null;
          return (
            <div
              key={i}
              className={[
                "cal-day",
                c.otherMonth         ? "other-month" : "",
                status === "approved" ? "leave"       : "",
                status === "pending"  ? "pending"     : "",
              ].join(" ")}
            >
              {c.day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginTop: 12, padding: "8px 0", borderTop: "0.5px solid var(--border)" }}>
        {[
          { color: "var(--green-bg)",  label: "Approved" },
          { color: "var(--amber-bg)",  label: "Pending"  },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text3)" }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MonthSchedule ────────────────────────────────────────────────────────────

function MonthSchedule({ year, month }) {
  const { leaves, employees } = useApp();

  const monthLeaves = leaves.filter((l) => {
    const d = new Date(l.from);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  if (!monthLeaves.length)
    return (
      <div className="empty">
        <div className="empty-text">No leaves this month</div>
      </div>
    );

  return (
    <div>
      {monthLeaves.map((l) => {
        const emp = employees.find((e) => e.id === l.empId);
        return (
          <div key={l.id} className="emp-row">
            {emp && <Avatar emp={emp} size="avatar-sm" />}
            <div className="emp-info">
              <div className="emp-name">{emp?.name || "—"}</div>
              <div className="emp-dept">
                {l.from} → {l.to} · {l.days}d
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <LeaveChip type={l.type} />
              <Badge status={l.status} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── CalendarView ─────────────────────────────────────────────────────────────

export function CalendarView() {
  const { leaves } = useApp();
  const [month, setMonth] = useState(2);
  const year = 2025;

  // Build a map: day → leave status for the current month
  const leaveDates = {};
  leaves.forEach((l) => {
    if (l.status === "approved" || l.status === "pending") {
      let d = new Date(l.from);
      const end = new Date(l.to);
      while (d <= end) {
        if (d.getFullYear() === year && d.getMonth() === month) {
          leaveDates[d.getDate()] = l.status;
        }
        d.setDate(d.getDate() + 1);
      }
    }
  });

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="topbar-title">Leave Calendar</div>
          <div className="topbar-sub">{MONTH_NAMES[month]} {year}</div>
        </div>
        <div className="topbar-actions">
          <button className="btn btn-sm" onClick={() => setMonth((m) => Math.max(0, m - 1))}>
            ‹ Prev
          </button>
          <button className="btn btn-sm" onClick={() => setMonth((m) => Math.min(11, m + 1))}>
            Next ›
          </button>
        </div>
      </div>

      <div className="content">
        <div className="two-col" style={{ alignItems: "start" }}>
          <div className="card" style={{ padding: "16px 18px" }}>
            <CalendarGrid year={year} month={month} leaveDates={leaveDates} />
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">{MONTH_NAMES[month]} Schedule</div>
            </div>
            <MonthSchedule year={year} month={month} />
          </div>
        </div>
      </div>
    </div>
  );
}
