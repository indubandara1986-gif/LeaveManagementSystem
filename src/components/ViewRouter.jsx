import React from "react";
import { useApp } from "../context/AppContext";
import { DashboardView } from "../views/DashboardView";
import { MyLeavesView }  from "../views/MyLeavesView";
import { CalendarView }  from "../views/CalendarView";
import { RequestsView }  from "../views/RequestsView";
import { EmployeesView } from "../views/EmployeesView";
import { ReportsView }   from "../views/ReportsView";

// ─── VIEWS registry ───────────────────────────────────────────────────────────
// Open/Closed Principle: add a new view by registering it here only —
// the router logic itself never changes.

const VIEWS = {
  dashboard: DashboardView,
  myLeaves:  MyLeavesView,
  calendar:  CalendarView,
  requests:  RequestsView,
  employees: EmployeesView,
  reports:   ReportsView,
};

// ─── ViewRouter ───────────────────────────────────────────────────────────────
// Liskov Substitution: every view component shares the same contract
// (no required props, reads from context) so any can slot in here.

export function ViewRouter() {
  const { activeNav } = useApp();
  const View = VIEWS[activeNav] || DashboardView;
  return <View />;
}
