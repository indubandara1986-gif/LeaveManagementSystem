import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { EMPLOYEES, INITIAL_LEAVES, LEAVE_TYPES } from "../data/constants";

// ─── Context ──────────────────────────────────────────────────────────────────
// Dependency Inversion Principle: components depend on this abstraction,
// not on concrete state. Swap the internals (e.g. API calls) without
// touching any consumer component.

const AppContext = createContext(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }) {
  const [leaves, setLeaves]           = useState(INITIAL_LEAVES);
  const [currentUser]                 = useState(EMPLOYEES[0]);
  const [isAdmin]                     = useState(true);
  const [showModal, setShowModal]     = useState(false);
  const [activeNav, setActiveNav]     = useState("dashboard");

  // Interface Segregation: each action is a discrete, minimal function
  const addLeave = useCallback((leave) => {
    setLeaves((prev) => [
      ...prev,
      {
        ...leave,
        id: Date.now(),
        status: "pending",
        appliedOn: new Date().toISOString().split("T")[0],
      },
    ]);
  }, []);

  const updateLeaveStatus = useCallback((id, status) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  }, []);

  const pendingCount = useMemo(
    () => leaves.filter((l) => l.status === "pending").length,
    [leaves]
  );

  const value = {
    leaves,
    currentUser,
    isAdmin,
    showModal,
    setShowModal,
    activeNav,
    setActiveNav,
    addLeave,
    updateLeaveStatus,
    pendingCount,
    employees: EMPLOYEES,
    leaveTypes: LEAVE_TYPES,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
