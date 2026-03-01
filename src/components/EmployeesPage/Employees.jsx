import React from "react";
import SectionCard from "../SectionCard";
import { UserPlus, Search, Download } from "lucide-react";
import EmployeesTableSection from "./EmployeesTableSection";

export default function Employees() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionCard
          title="Employees"
          description="Manage and view your organization's workforce"
        />

        <button className="flex items-center gap-2 font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <UserPlus size={20} />
          <span>Add New Employee</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 w-full max-w-md">
          <Search className="text-gray-400" size={18} />
          <input
            type="search"
            placeholder="Search by name, email, title, or department..."
            className="outline-none w-full text-sm"
          />
        </div>
        <button className="flex items-center gap-2 font-bold bg-white border border-gray-200 text-neutral-950 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Download size={20} />
          <span>Export to CSV</span>
        </button>
      </div>

      <EmployeesTableSection />
    </div>
  );
}
