import React from "react";
import { AppProvider } from "./context/AppContext";
import { Sidebar } from "./components/Sidebar";
import { ViewRouter } from "./components/ViewRouter";
import { ApplyLeaveModal } from "./components/ApplyLeaveModal";
import { useApp } from "./context/AppContext";

// ─── AppShell ─────────────────────────────────────────────────────────────────
// Composes the sidebar, active view, and modal layer.
// Kept separate from App so that useApp() can be called inside AppProvider.

function AppShell() {
  const { showModal } = useApp();
  return (
    <>
      <Sidebar />
      <div className="main">
        <ViewRouter />
      </div>
      {showModal && <ApplyLeaveModal />}
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
