import React, { useState, useEffect, useMemo } from "react";
import SectionCard from "../SectionCard";
import { UserPlus, Search, Download, X } from "lucide-react";
import EmployeesTableSection from "./EmployeesTableSection";
import EmployeeProfile from "./EmployeeProfile";
import { fetchWorkforceData } from "../../data/workforce";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Engineering",
  });

  // Load workforce data
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchWorkforceData();

        if (!data?.departments) {
          setEmployees([]);
          return;
        }

        const firstNames = [
          "Sarah",
          "Michael",
          "Emily",
          "James",
          "Aisha",
          "Carlos",
          "Jessica",
          "Daniel",
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
          "Johnson",
          "Rodriguez",
          "Chen",
          "Wilson",
          "Patel",
          "Mendez",
          "Lee",
          "Thompson",
          "Brown",
          "Smith",
          "Davis",
          "Martinez",
          "Taylor",
          "Anderson",
          "Thomas",
          "Clark",
        ];

        let globalIndex = 0;

        const flatEmployees = data.departments.flatMap((dept) =>
          Array.from({ length: dept.value }).map((_, i) => {
            const id = crypto.randomUUID();
            const first = firstNames[globalIndex % firstNames.length];
            const last = lastNames[globalIndex % lastNames.length];

            const employee = {
              id,
              name: `${first} ${last}`,
              email: `${first.toLowerCase()}.${last.toLowerCase()}${globalIndex}@company.com`,
              jobTitle: "Staff Member",
              department: dept.name,
              location: "Lagos, NG",
              employmentType: i % 2 === 0 ? "Full-time" : "Contractor",
              startDate: `202${i % 4}-0${(i % 9) + 1}-15`,
              salary: 50000 + i * 1200,
              manager: "David Chen",
              status: ["Active", "On Leave", "Onboarding"][i % 3],
              phone: "(555) 123-4567",
              dob: "1990-05-20",
              address: "123 Broadway, Lagos",
              emergencyContact: {
                name: "Jane Doe",
                relationship: "Spouse",
                phone: "(555) 987-6543",
              },
            };

            globalIndex++;
            return employee;
          }),
        );

        setEmployees(flatEmployees);
      } catch (error) {
        console.error("Failed to load workforce data:", error);
        setEmployees([]);
      }
    }

    loadData();
  }, []);

  // Filter employees
  const filteredEmployees = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return employees.filter((emp) =>
      `${emp.name} ${emp.email} ${emp.department} ${emp.jobTitle}`
        .toLowerCase()
        .includes(term),
    );
  }, [employees, searchTerm]);

  // Add new employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();

    if (employees.some((emp) => emp.email.toLowerCase() === trimmedEmail)) {
      alert("An employee with this email already exists.");
      return;
    }

    const newEntry = {
      id: crypto.randomUUID(),
      name: trimmedName,
      email: trimmedEmail,
      department: formData.department,
      jobTitle: "New Hire",
      location: "Lagos, NG",
      employmentType: "Full-time",
      startDate: new Date().toISOString().split("T")[0],
      status: "Onboarding",
    };

    setEmployees((prev) => [newEntry, ...prev]);
    setIsModalOpen(false);
    setFormData({ name: "", email: "", department: "Engineering" });
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Name,Email,Department,Job Title,Location,Type,Status\n"];
    const rows = filteredEmployees.map(
      (emp) =>
        `${emp.name},${emp.email},${emp.department},${emp.jobTitle},${emp.location},${emp.employmentType},${emp.status}\n`,
    );
    const csvContent = headers.concat(rows).join("");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const today = new Date().toISOString().split("T")[0];
    link.setAttribute("download", `workforce_export_${today}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ✅ FIXED: Conditional rendering must be inside return
  return selectedEmployee ? (
    <EmployeeProfile
      employee={selectedEmployee}
      onBack={() => setSelectedEmployee(null)}
    />
  ) : (
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

      <EmployeesTableSection
        employees={filteredEmployees}
        onSelectEmployee={setSelectedEmployee} // ✅ Pass handler
      />

      {/* Modal for adding employee */}
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
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-600"
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
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-600"
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
                  className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-600"
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
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-semibold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
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
