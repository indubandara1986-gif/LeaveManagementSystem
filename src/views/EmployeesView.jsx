import React from "react";
import { useApp } from "../context/AppContext";
import { Avatar, Badge } from "../components/Atoms";

// ─── EmployeeRow ──────────────────────────────────────────────────────────────
// Single Responsibility: renders one employee's summary row.

function EmployeeRow({ emp, pendingCount, annualLeft }) {
  return (
    <div className="emp-row">
      <Avatar emp={emp} />
      <div className="emp-info">
        <div className="emp-name">{emp.name}</div>
        <div className="emp-dept">
          {emp.dept} · {emp.role}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 13,
              fontFamily: "var(--mono)",
              fontWeight: 500,
              color: "var(--accent)",
            }}
          >
            {annualLeft} days
          </div>
          <div style={{ fontSize: 11, color: "var(--text3)" }}>annual left</div>
        </div>
        {pendingCount > 0 && (
          <Badge status="pending" />
        )}
      </div>
    </div>
  );
}

// ─── EmployeesView ────────────────────────────────────────────────────────────

export function EmployeesView() {
  const { employees, leaves } = useApp();

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="topbar-title">Employees</div>
          <div className="topbar-sub">{employees.length} team members</div>
        </div>
      </div>

      <div className="content">
        <div className="card">
          {employees.map((emp) => {
            const empLeaves  = leaves.filter((l) => l.empId === emp.id);
            const pending    = empLeaves.filter((l) => l.status === "pending").length;
            return (
              <EmployeeRow
                key={emp.id}
                emp={emp}
                pendingCount={pending}
                annualLeft={emp.balance.annual}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
