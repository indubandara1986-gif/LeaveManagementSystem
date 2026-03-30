import React from "react";
import { useApp } from "../context/AppContext";
import { Avatar } from "./Atoms";
import { NAV_ITEMS } from "../data/constants";

// ─── Sidebar ──────────────────────────────────────────────────────────────────
// Single Responsibility: renders navigation and current-user info.
// Open/Closed: add new nav items in data/constants.js without editing here.

export function Sidebar() {
  const { activeNav, setActiveNav, pendingCount, currentUser, isAdmin } = useApp();

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.adminOnly || isAdmin
  );

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">◈ LeaveDesk</div>
        <div className="logo-sub">v2.4.0 · 2025</div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Menu</div>

        {visibleItems.map((item) => {
          const badge =
            item.id === "requests" && pendingCount > 0
              ? pendingCount
              : null;

          return (
            <div
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {badge && <span className="nav-badge">{badge}</span>}
            </div>
          );
        })}
      </div>

      <div className="sidebar-user">
        <div className="user-row">
          <Avatar emp={currentUser} />
          <div>
            <div className="user-name">{currentUser.name.split(" ")[0]}</div>
            <div className="user-role">
              <span
                className="role-badge"
                style={{
                  background: "var(--accent-bg)",
                  color: "var(--accent-text)",
                }}
              >
                {isAdmin ? "Admin" : "Staff"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
