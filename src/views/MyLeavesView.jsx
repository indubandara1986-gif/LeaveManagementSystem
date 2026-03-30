import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Badge, LeaveChip } from "../components/Atoms";

// ─── FilterBar ────────────────────────────────────────────────────────────────
// Single Responsibility: status filter UI only.

function FilterBar({ active, onChange }) {
  const filters = ["all", "pending", "approved", "rejected"];
  return (
    <div className="filter-row">
      {filters.map((f) => (
        <div
          key={f}
          className={`filter-chip ${active === f ? "active" : ""}`}
          onClick={() => onChange(f)}
        >
          {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
        </div>
      ))}
    </div>
  );
}

// ─── LeavesTable ──────────────────────────────────────────────────────────────
// Single Responsibility: renders a list of leave records as a table.

function LeavesTable({ leaves }) {
  if (!leaves.length)
    return (
      <div className="empty">
        <div className="empty-text">No leave requests found</div>
      </div>
    );

  return (
    <table>
      <thead>
        <tr>
          {["Type", "From", "To", "Days", "Reason", "Applied", "Status"].map(
            (h) => <th key={h}>{h}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {leaves.map((l) => (
          <tr key={l.id}>
            <td><LeaveChip type={l.type} /></td>
            <td>{l.from}</td>
            <td>{l.to}</td>
            <td style={{ fontFamily: "var(--mono)", fontWeight: 500 }}>{l.days}</td>
            <td style={{ maxWidth: 160, color: "var(--text2)" }}>{l.reason}</td>
            <td style={{ color: "var(--text3)" }}>{l.appliedOn}</td>
            <td><Badge status={l.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── MyLeavesView ─────────────────────────────────────────────────────────────

export function MyLeavesView() {
  const { leaves, currentUser, setShowModal } = useApp();
  const [filter, setFilter] = useState("all");

  const myLeaves = leaves.filter((l) => l.empId === currentUser.id);
  const filtered =
    filter === "all" ? myLeaves : myLeaves.filter((l) => l.status === filter);

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="topbar-title">My Leaves</div>
          <div className="topbar-sub">{myLeaves.length} total requests</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Apply Leave
        </button>
      </div>

      <div className="content">
        <FilterBar active={filter} onChange={setFilter} />
        <div className="card">
          <LeavesTable leaves={filtered} />
        </div>
      </div>
    </div>
  );
}
