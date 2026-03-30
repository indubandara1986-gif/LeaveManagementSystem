import React from "react";
import { useApp } from "../context/AppContext";
import { Badge, LeaveChip, Avatar, StatCard } from "../components/Atoms";

// ─── LeaveBalanceBar ──────────────────────────────────────────────────────────
// Single Responsibility: renders visual leave-balance bars for one employee.

function LeaveBalanceBar({ balance }) {
  const bars = [
    { name: "Annual Leave",  used: 20 - balance.annual,   total: 20, color: "#185FA5" },
    { name: "Sick Leave",    used: 10 - balance.sick,     total: 10, color: "#A32D2D" },
    { name: "Personal",      used: 5  - balance.personal, total: 5,  color: "#854F0B" },
  ];

  return (
    <div>
      {bars.map((b) => (
        <div key={b.name} className="balance-item">
          <div className="balance-label">
            <div className="balance-name">{b.name}</div>
            <div className="balance-days">
              {b.used} used · {b.total - b.used} remaining
            </div>
          </div>
          <div className="balance-bar-wrap">
            <div
              className="balance-bar"
              style={{
                width: `${Math.round(((b.total - b.used) / b.total) * 100)}%`,
                background: b.color,
              }}
            />
          </div>
          <div className="balance-count">{b.total - b.used}</div>
        </div>
      ))}
    </div>
  );
}

// ─── RecentActivity ───────────────────────────────────────────────────────────

function RecentActivity({ leaves }) {
  const { employees } = useApp();
  const recent = [...leaves].sort((a, b) => b.id - a.id).slice(0, 5);

  if (!recent.length)
    return (
      <div className="empty">
        <div className="empty-text">No activity yet</div>
      </div>
    );

  const dotColors = {
    approved: "var(--green)",
    pending:  "var(--amber)",
    rejected: "var(--red)",
  };

  return (
    <div style={{ padding: "0 16px" }}>
      {recent.map((l) => {
        const emp = employees.find((e) => e.id === l.empId);
        return (
          <div key={l.id} className="timeline-item">
            <div className="timeline-dot-wrap">
              <div
                className="timeline-dot"
                style={{ background: dotColors[l.status] }}
              />
            </div>
            <div className="timeline-content">
              <div className="timeline-title">{emp?.name || "Unknown"}</div>
              <div className="timeline-meta">
                <LeaveChip type={l.type} />
                {" · "}
                <Badge status={l.status} />
                {" · "}
                {l.from}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── DashboardView ────────────────────────────────────────────────────────────

export function DashboardView() {
  const { leaves, setShowModal, currentUser } = useApp();

  const stats = {
    total:     leaves.length,
    pending:   leaves.filter((l) => l.status === "pending").length,
    approved:  leaves.filter((l) => l.status === "approved").length,
    totalDays: leaves
      .filter((l) => l.status === "approved")
      .reduce((s, l) => s + l.days, 0),
  };

  return (
    <div>
      {/* Topbar */}
      <div className="topbar">
        <div>
          <div className="topbar-title">Dashboard</div>
          <div className="topbar-sub">
            Good morning, {currentUser.name.split(" ")[0]} ✦ March 2025
          </div>
        </div>
        <div className="topbar-actions">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Apply Leave
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="stats-grid">
          <StatCard label="Total Requests" value={stats.total}     sub="all time"         accent="accent" />
          <StatCard label="Pending"         value={stats.pending}   sub="awaiting review"  accent="amber"  />
          <StatCard label="Approved"        value={stats.approved}  sub="this year"        accent="green"  />
          <StatCard label="Days Off Taken"  value={stats.totalDays} sub="approved days"    accent="red"    />
        </div>

        <div className="two-col">
          <div className="card">
            <div className="card-header">
              <div className="card-title">My Leave Balance</div>
            </div>
            <div className="card-body">
              <LeaveBalanceBar balance={currentUser.balance} />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent Activity</div>
            </div>
            <div className="card-body">
              <RecentActivity leaves={leaves} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
