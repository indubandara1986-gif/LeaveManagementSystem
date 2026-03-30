import React from "react";
import { useApp } from "../context/AppContext";
import { Avatar } from "../components/Atoms";

// ─── LeaveByTypeChart ─────────────────────────────────────────────────────────
// Single Responsibility: progress-bar chart for leave types.

function LeaveByTypeChart({ leaveTypes, leaves }) {
  const rows = leaveTypes.map((lt) => ({
    ...lt,
    count: leaves.filter((l) => l.type === lt.id && l.status === "approved").length,
    days:  leaves.filter((l) => l.type === lt.id && l.status === "approved")
                 .reduce((s, l) => s + l.days, 0),
  }));

  const maxDays = Math.max(...rows.map((r) => r.days), 1);

  return (
    <div style={{ padding: "16px 18px" }}>
      {rows.map((row) => (
        <div key={row.id} className="progress-row">
          <div className="progress-label">
            <span>{row.label}</span>
            <span style={{ fontFamily: "var(--mono)", fontWeight: 500 }}>
              {row.days}d / {row.count} reqs
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${Math.round((row.days / maxDays) * 100)}%`,
                background: "var(--accent)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── EmployeeStatsTable ───────────────────────────────────────────────────────

function EmployeeStatsTable({ employees, leaves }) {
  const rows = employees.map((emp) => ({
    ...emp,
    total:    leaves.filter((l) => l.empId === emp.id).length,
    approved: leaves.filter((l) => l.empId === emp.id && l.status === "approved").length,
    days:     leaves.filter((l) => l.empId === emp.id && l.status === "approved")
                    .reduce((s, l) => s + l.days, 0),
  }));

  return (
    <table>
      <thead>
        <tr>
          {["Employee", "Requests", "Approved", "Days Off"].map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((emp) => (
          <tr key={emp.id}>
            <td>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar emp={emp} size="avatar-sm" />
                {emp.name}
              </div>
            </td>
            <td style={{ fontFamily: "var(--mono)" }}>{emp.total}</td>
            <td style={{ fontFamily: "var(--mono)", color: "var(--green)" }}>
              {emp.approved}
            </td>
            <td style={{ fontFamily: "var(--mono)", fontWeight: 600 }}>
              {emp.days}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── ReportsView ──────────────────────────────────────────────────────────────

export function ReportsView() {
  const { leaves, employees, leaveTypes } = useApp();

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="topbar-title">Reports</div>
          <div className="topbar-sub">Analytics · March 2025</div>
        </div>
      </div>

      <div className="content">
        <div className="two-col">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Leave by Type</div>
            </div>
            <LeaveByTypeChart leaveTypes={leaveTypes} leaves={leaves} />
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">By Employee</div>
            </div>
            <EmployeeStatsTable employees={employees} leaves={leaves} />
          </div>
        </div>
      </div>
    </div>
  );
}
