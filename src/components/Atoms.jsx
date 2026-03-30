import React from "react";

// ─── Badge ────────────────────────────────────────────────────────────────────
// Interface Segregation Principle: each atom accepts only what it needs.

const STATUS_MAP = {
  pending:  { cls: "badge-pending",  label: "Pending"  },
  approved: { cls: "badge-approved", label: "Approved" },
  rejected: { cls: "badge-rejected", label: "Rejected" },
};

export function Badge({ status }) {
  const { cls, label } = STATUS_MAP[status] || { cls: "badge-info", label: status };
  return (
    <span className={`badge ${cls}`}>
      <span className="dot" />
      {label}
    </span>
  );
}

// ─── LeaveChip ────────────────────────────────────────────────────────────────

import { LEAVE_TYPES } from "../data/constants";

export function LeaveChip({ type }) {
  const lt = LEAVE_TYPES.find((t) => t.id === type);
  return (
    <span className={`leave-chip ${lt?.color || "chip-unpaid"}`}>
      {lt?.label || type}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

export function Avatar({ emp, size = "" }) {
  return (
    <div
      className={`avatar ${size}`}
      style={{ background: emp.color, color: emp.textColor }}
    >
      {emp.initials}
    </div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

const ACCENT_COLORS = {
  accent: "var(--accent)",
  green:  "var(--green)",
  amber:  "var(--amber)",
  red:    "var(--red)",
};

export function StatCard({ label, value, sub, accent = "accent" }) {
  return (
    <div className={`stat-card ${accent}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{ color: ACCENT_COLORS[accent] }}>
        {value}
      </div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}
