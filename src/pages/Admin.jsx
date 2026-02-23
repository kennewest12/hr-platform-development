import React, { useState } from "react";
import Headers from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

import Dashboard from "../components/DashboardPage/dashboard";

export default function Admin() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  return (
    <div className="flex flex-col bg-gray-50">
      <Headers />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 overflow-y-auto bg-transparent">
          <div className="p-6 space-y-6">
            {currentPage === "Dashboard" && <Dashboard />}
          </div>
        </main>
      </div>
    </div>
  );
}
