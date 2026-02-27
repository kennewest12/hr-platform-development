// Simulated data
const workforceData = {
  totalEmployees: 247,
  active: 189,
  onLeave: 58,

  // 🔥 NEW HIRE DATA
  newRecruit: [
    { id: 1, name: "Liam Carter", period: "thisMonth" },
    { id: 2, name: "Olivia Brown", period: "thisMonth" },
    { id: 3, name: "Ethan Smith", period: "nextWeek" },
    { id: 4, name: "Ava Johnson", period: "nextWeek" },
    { id: 5, name: "Mason Lee", period: "thisMonth" },
    { id: 6, name: "Isabella Davis", period: "nextMonth" },
    { id: 7, name: "Logan Martinez", period: "nextWeek" },
    { id: 8, name: "Sophia Wilson", period: "thisMonth" },
    { id: 9, name: "Lucas Taylor", period: "nextMonth" },
    { id: 10, name: "Mia Anderson", period: "thisMonth" },
    { id: 11, name: "Noah Thomas", period: "nextWeek" },
    { id: 12, name: "Charlotte Harris", period: "thisMonth" },
    { id: 13, name: "Kenneth Clark", period: "nextMonth" },
  ],

  // 🔥 UPCOMING EVENTS  LOGIC
  upcomingEvents: [
    { id: 1, name: "Liam Carter", type: "birthday", date: "2026-03-10" },
    { id: 2, name: "Olivia Brown", type: "birthday", date: "2026-03-12" },
    { id: 3, name: "Ethan Smith", type: "anniversary", date: "2026-03-20" },
    { id: 4, name: "Ava Johnson", type: "birthday", date: "2026-03-15" },
    { id: 5, name: "Mia Anderson", type: "anniversary", date: "2026-03-25" },
  ],
  // 🔥 OPEN POSITIONS (for hiring logic)
  openPositions: [
    {
      id: 1,
      title: "Frontend Developer",
      priority: "high",
      department: "Engineering",
    },
    {
      id: 2,
      title: "Backend Developer",
      priority: "high",
      department: "Engineering",
    },
    {
      id: 3,
      title: "Marketing Manager",
      priority: "normal",
      department: "Marketing",
    },
    {
      id: 4,
      title: "Sales Executive",
      priority: "normal",
      department: "Sales",
    },
    { id: 5, title: "HR Specialist", priority: "normal", department: "HR" },
    {
      id: 6,
      title: "Product Designer",
      priority: "normal",
      department: "Product",
    },
    { id: 7, title: "Data Analyst", priority: "high", department: "Finance" },
    {
      id: 8,
      title: "Content Strategist",
      priority: "normal",
      department: "Marketing",
    },
    { id: 9, title: "Recruiter", priority: "normal", department: "HR" },
    { id: 10, title: "UX Researcher", priority: "high", department: "Product" },
    {
      id: 11,
      title: "Account Manager",
      priority: "normal",
      department: "Sales",
    },
    {
      id: 12,
      title: "Financial Controller",
      priority: "high",
      department: "Finance",
    },
  ],
  departments: [
    { name: "Engineering", value: 85 },
    { name: "Sales", value: 52 },
    { name: "Marketing", value: 38 },
    { name: "Product", value: 28 },
    { name: "HR", value: 15 },
    { name: "Finance", value: 12 },
    { name: "Other", value: 17 },
  ],

  headcountGrowth: [
    { month: "Aug", headcount: 210 },
    { month: "Sep", headcount: 225 },
    { month: "Oct", headcount: 232 },
    { month: "Nov", headcount: 240 },
    { month: "Dec", headcount: 245 },
    { month: "Jan", headcount: 248 },
    { month: "Feb", headcount: 255 },
  ],

  actionItems: [
    {
      id: 1,
      title: "Approve 3 leave requests",
      priority: "high",
      color: "red",
    },
    {
      id: 2,
      title: "Schedule interviews for Marketing position",
      priority: "medium",
      color: "yellow",
    },
    {
      id: 3,
      title: "Send benefits enrollment reminder",
      priority: "low",
      color: "green",
    },
  ],
};

// Simulated API call with a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchWorkforceData() {
  await delay(200); // simulate network delay
  return workforceData;
}
