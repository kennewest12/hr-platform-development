import React, { useState, useEffect, useMemo } from "react";
import SectionCard from "../SectionCard";
import { UserPlus, Search, Download, X } from "lucide-react";
import EmployeesTableSection from "./EmployeesTableSection";
import { fetchWorkforceData } from "../../data/workforce";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls pop-up
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Engineering",
  });

  useEffect(() => {
    async function loadData() {
      const data = await fetchWorkforceData();

      if (!data?.departments) {
        setEmployees([]);
        return;
      }

      const firstNames = [
        "Liam",
        "Olivia",
        "Ethan",
        "Ava",
        "Mason",
        "Isabella",
        "Logan",
        "Sophia",
        "Lucas",
        "Mia",
      ];

      const lastNames = [
        "Smith",
        "Johnson",
        "Lee",
        "Brown",
        "Davis",
        "Martinez",
        "Taylor",
        "Anderson",
        "Thomas",
        "Clark",
      ];

      let globalIndex = 0;

      const flatEmployees = data.departments.flatMap((dept, deptIdx) =>
        Array.from({ length: dept.value }).map((_, i) => {
          const id = `${deptIdx}-${i}`;
          const first = firstNames[globalIndex % firstNames.length];
          const last = lastNames[globalIndex % lastNames.length];

          const employee = {
            id,
            name: `${first} ${last}`,
            email: `${first.toLowerCase()}.${last.toLowerCase()}${id}@company.com`,
            title: "Staff Member",
            department: dept.name,
            location: "Lagos, NG",
            type: i % 2 === 0 ? "Full-time" : "Contract",
            date: "2023",
            status: ["Active", "On Leave", "Onboarding"][i % 3],
            isNew: globalIndex < 6,
          };

          globalIndex++;
          return employee;
        }),
      );

      setEmployees(flatEmployees);
    }

    loadData();
  }, []);

  // 🔎 FILTERED DATA (Professional Pattern)
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      `${emp.name} ${emp.email} ${emp.department} ${emp.title}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [employees, searchTerm]);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(), // Unique ID
      ...formData,
      title: "New Hire",
      location: "Lagos, NG",
      type: "Full-time",
      date: new Date().getFullYear().toString(),
      status: "Onboarding",
    };

    setEmployees([newEntry, ...employees]); // Add to the top
    setIsModalOpen(false); // Close modal
    setFormData({ name: "", email: "", department: "Engineering" }); // Reset form
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["Name,Email,Department,Job Title,Location,Type,Status\n"];

    const rows = employees.map(
      (emp) =>
        `${emp.name},${emp.email},${emp.department},${emp.title},${emp.location},${emp.type},${emp.status}\n`,
    );

    const csvContent = headers.concat(rows).join("");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `workforce_export_${new Date().toLocaleDateString()}.csv`,
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionCard
          title="Employees"
          description="Manage and view your organization's workforce"
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 font-bold bg-white border border-gray-200 text-neutral-950 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download size={20} />
          <span>Export to CSV</span>
        </button>
      </div>

      <EmployeesTableSection employees={filteredEmployees} />

      {/* 🖼️ THE MODAL (The Pop-up) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">
                Add New Employee
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddEmployee} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">
                  Full Name
                </label>
                <input
                  required
                  autoFocus
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-700">
                  Department
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  <option>Engineering</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Product</option>
                  <option>HR</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border rounded-lg font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-shadow shadow-lg shadow-blue-200"
                >
                  Create Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
