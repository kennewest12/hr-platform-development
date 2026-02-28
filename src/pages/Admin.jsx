import React, { useState } from "react";
import Headers from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

import Dashboard from "../components/DashboardPage/Dashboard";
import Employees from "../components/EmployeesPage/Employees";
import Attendance from "../components/AttendancePage/Attendance";
import Recruitment from "../components/RecruitmentPage/Recruitment";
import Payroll from "../components/PayrollPage/Payroll";
import Calendar from "../components/CalendarPage/Calendar";
import Reports from "../components/ReportPage/Reports";
import Documents from "../components/DocumentsPage/Documents";
import Settings from "../components/SettingsPage/Settings";

export default function Admin() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  return (
    <div className="flex flex-col bg-gray-50">
      <Headers />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 overflow-y-auto bg-transparent">
          <div className="p-6 space-y-6">
            {/* Show Dashboard when state is Dashboard */}
            {currentPage === "Dashboard" && <Dashboard />}

            {/* Show Report when state is Reports */}
            {currentPage === "Employees" && <Employees />}

            {/* Show Attendance when state is Attendance*/}
            {currentPage === "Attendance" && <Attendance />}

            {/* Show Recruitment when state is Recruitment*/}
            {currentPage === "Recruitment" && <Recruitment />}

            {/* Show Payroll when state is Payroll */}
            {currentPage === "Payroll" && <Payroll />}

            {/* Show Calendar when state is Calendar */}
            {currentPage === "Calendar" && <Calendar />}

            {/* Show Report when state is Reports */}
            {currentPage === "Reports" && <Reports />}

            {/* Show Documents when state is RDocuments */}
            {currentPage === "Documents" && <Documents />}

            {/* Show Settings when state is Settings*/}
            {currentPage === "Settings" && <Settings />}
          </div>
        </main>
      </div>
    </div>
  );
}
