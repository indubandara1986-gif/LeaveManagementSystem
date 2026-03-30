// ─── Leave Types ─────────────────────────────────────────────────────────────
// Open/Closed Principle: add new leave types here without touching components

export const LEAVE_TYPES = [
  { id: "annual",    label: "Annual Leave",  color: "chip-annual",   total: 20 },
  { id: "sick",      label: "Sick Leave",    color: "chip-sick",     total: 10 },
  { id: "personal",  label: "Personal",      color: "chip-personal", total: 5  },
  { id: "maternity", label: "Maternity",     color: "chip-maternity",total: 90 },
  { id: "unpaid",    label: "Unpaid",        color: "chip-unpaid",   total: 30 },
];

// ─── Employees ────────────────────────────────────────────────────────────────

export const EMPLOYEES = [
  {
    id: 1,
    name: "Anjali Perera",
    dept: "Engineering",
    role: "Manager",
    initials: "AP",
    color: "#EEEDFE",
    textColor: "#3C3489",
    balance: { annual: 14, sick: 8, personal: 3 },
  },
  {
    id: 2,
    name: "Rohan Silva",
    dept: "Design",
    role: "Staff",
    initials: "RS",
    color: "#E1F5EE",
    textColor: "#085041",
    balance: { annual: 7, sick: 10, personal: 5 },
  },
  {
    id: 3,
    name: "Nimali Fernando",
    dept: "HR",
    role: "Staff",
    initials: "NF",
    color: "#FAEEDA",
    textColor: "#633806",
    balance: { annual: 18, sick: 6, personal: 2 },
  },
  {
    id: 4,
    name: "Kasun Wickrama",
    dept: "Finance",
    role: "Staff",
    initials: "KW",
    color: "#FAECE7",
    textColor: "#4A1B0C",
    balance: { annual: 3, sick: 9, personal: 4 },
  },
  {
    id: 5,
    name: "Dilshan Ranatunga",
    dept: "Engineering",
    role: "Staff",
    initials: "DR",
    color: "#E6F1FB",
    textColor: "#042C53",
    balance: { annual: 11, sick: 7, personal: 1 },
  },
];

// ─── Initial Leave Requests ───────────────────────────────────────────────────

export const INITIAL_LEAVES = [
  {
    id: 1, empId: 1, type: "annual",
    from: "2025-03-10", to: "2025-03-14", days: 5,
    reason: "Family vacation", status: "approved", appliedOn: "2025-02-28",
  },
  {
    id: 2, empId: 2, type: "sick",
    from: "2025-03-17", to: "2025-03-18", days: 2,
    reason: "Fever and rest", status: "approved", appliedOn: "2025-03-17",
  },
  {
    id: 3, empId: 3, type: "personal",
    from: "2025-03-20", to: "2025-03-20", days: 1,
    reason: "Personal appointment", status: "pending", appliedOn: "2025-03-15",
  },
  {
    id: 4, empId: 4, type: "annual",
    from: "2025-03-24", to: "2025-03-28", days: 5,
    reason: "Wedding event", status: "pending", appliedOn: "2025-03-12",
  },
  {
    id: 5, empId: 5, type: "sick",
    from: "2025-03-05", to: "2025-03-06", days: 2,
    reason: "Migraine", status: "rejected", appliedOn: "2025-03-05",
  },
  {
    id: 6, empId: 1, type: "personal",
    from: "2025-04-02", to: "2025-04-02", days: 1,
    reason: "Medical checkup", status: "pending", appliedOn: "2025-03-25",
  },
];

// ─── Navigation Items ─────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { id: "dashboard", icon: "◈", label: "Dashboard",  adminOnly: false },
  { id: "myLeaves",  icon: "◷", label: "My Leaves",  adminOnly: false },
  { id: "calendar",  icon: "▦", label: "Calendar",   adminOnly: false },
  { id: "requests",  icon: "◎", label: "Requests",   adminOnly: true  },
  { id: "employees", icon: "◉", label: "Employees",  adminOnly: true  },
  { id: "reports",   icon: "▤", label: "Reports",    adminOnly: true  },
];
