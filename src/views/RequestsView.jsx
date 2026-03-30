import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Avatar, Badge, LeaveChip } from "../components/Atoms";

// ─── ActionButtons ────────────────────────────────────────────────────────────
// Single Responsibility: approve/reject controls for a single leave row.
// Liskov Substitution: ActionButtons can be replaced by any component that
// accepts { leaveId, onApprove, onReject } and renders action controls.

function ActionButtons({ leaveId, status, onApprove, onReject }) {
  if (status !== "pending") return null;
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <button
        className="btn btn-sm btn-success"
        onClick={() => onApprove(leaveId)}
      >
        ✓ Approve
      </button>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => onReject(leaveId)}
      >
        ✕
      </button>
    </div>
  );
}

// ─── RequestsTable ────────────────────────────────────────────────────────────

function RequestsTable({ leaves, employees, onApprove, onReject }) {
  if (!leaves.length)
    return (
      <div className="empty">
        <div className="empty-text">No requests found</div>
      </div>
    );

  return (
    <table>
      <thead>
        <tr>
          {["Employee", "Type", "Period", "Days", "Reason", "Status", "Action"].map(
            (h) => <th key={h}>{h}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {leaves.map((l) => {
          const emp = employees.find((e) => e.id === l.empId);
          return (
            <tr key={l.id}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {emp && <Avatar emp={emp} size="avatar-sm" />}
                  <div>
                    <div style={{ fontWeight: 500 }}>{emp?.name || "—"}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>
                      {emp?.dept}
                    </div>
                  </div>
                </div>
              </td>
              <td><LeaveChip type={l.type} /></td>
              <td style={{ color: "var(--text2)", fontFamily: "var(--mono)", fontSize: 12 }}>
                {l.from} → {l.to}
              </td>
              <td style={{ fontFamily: "var(--mono)", fontWeight: 500 }}>{l.days}</td>
              <td style={{ color: "var(--text2)", maxWidth: 140 }}>{l.reason}</td>
              <td><Badge status={l.status} /></td>
              <td>
                <ActionButtons
                  leaveId={l.id}
                  status={l.status}
                  onApprove={onApprove}
                  onReject={onReject}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// ─── RequestsView ─────────────────────────────────────────────────────────────

export function RequestsView() {
  const { leaves, employees, updateLeaveStatus } = useApp();
  const [filter, setFilter] = useState("pending");

  const filtered =
    filter === "all"
      ? leaves
      : leaves.filter((l) => l.status === filter);

  const pendingCount = leaves.filter((l) => l.status === "pending").length;

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="topbar-title">Leave Requests</div>
          <div className="topbar-sub">{pendingCount} pending review</div>
        </div>
      </div>

      <div className="content">
        <div className="filter-row">
          {["pending", "approved", "rejected", "all"].map((f) => (
            <div
              key={f}
              className={`filter-chip ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </div>
          ))}
        </div>

        <div className="card">
          <RequestsTable
            leaves={filtered}
            employees={employees}
            onApprove={(id) => updateLeaveStatus(id, "approved")}
            onReject={(id)  => updateLeaveStatus(id, "rejected")}
          />
        </div>
      </div>
    </div>
  );
}
