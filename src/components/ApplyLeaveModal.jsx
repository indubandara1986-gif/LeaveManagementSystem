import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useLeaveCalculator } from "../hooks/useLeaveCalculator";

// ─── ApplyLeaveModal ──────────────────────────────────────────────────────────
// Single Responsibility: handles leave application form state and submission.
// Dependency Inversion: calls addLeave() from context — doesn't know how
// leaves are stored.

const EMPTY_FORM = { type: "annual", from: "", to: "", reason: "" };

export function ApplyLeaveModal() {
  const { setShowModal, addLeave, currentUser, leaveTypes } = useApp();
  const { calcDays } = useLeaveCalculator();
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  const days = calcDays(form.from, form.to);

  const set = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!form.from || !form.to) {
      setError("Please select both start and end dates.");
      return;
    }
    if (!form.reason.trim()) {
      setError("Please provide a reason.");
      return;
    }
    addLeave({ empId: currentUser.id, ...form, days });
    setShowModal(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setShowModal(false);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">Apply for Leave</div>
          <button className="modal-close" onClick={() => setShowModal(false)}>
            ×
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="alert alert-info">
            ✦ Requests are reviewed within 2 business days.
          </div>

          {error && (
            <div className="alert alert-warning" style={{ marginBottom: 14 }}>
              {error}
            </div>
          )}

          {/* Leave Type */}
          <div className="form-group">
            <label className="form-label">Leave Type</label>
            <select
              className="form-select"
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
            >
              {leaveTypes.map((lt) => (
                <option key={lt.id} value={lt.id}>
                  {lt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="form-row">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">From</label>
              <input
                type="date"
                className="form-input"
                value={form.from}
                onChange={(e) => { set("from", e.target.value); setError(""); }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">To</label>
              <input
                type="date"
                className="form-input"
                value={form.to}
                min={form.from}
                onChange={(e) => { set("to", e.target.value); setError(""); }}
              />
            </div>
          </div>

          {days > 0 && (
            <div style={{ margin: "10px 0", fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>
              Duration: {days} day{days !== 1 ? "s" : ""}
            </div>
          )}

          {/* Reason */}
          <div className="form-group" style={{ marginTop: 14 }}>
            <label className="form-label">Reason</label>
            <textarea
              className="form-textarea"
              placeholder="Brief description..."
              value={form.reason}
              onChange={(e) => { set("reason", e.target.value); setError(""); }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            + Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}
