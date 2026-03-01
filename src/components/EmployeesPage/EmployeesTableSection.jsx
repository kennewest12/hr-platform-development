import React, { useState } from "react";
import Pagination from "./Pagination";

export default function EmployeesTableSection() {
  const employees = [
    {
      name: "Sarah Chen",
      email: "sarah.c@company.com",
      title: "Senior Designer",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      date: "Jan 12, 2023",
      status: "Active",
    },
    {
      name: "Marcus Wright",
      email: "m.wright@company.com",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Lagos, NG",
      type: "Contract",
      date: "Mar 05, 2023",
      status: "On Leave",
    },
    {
      name: "Marcus Wright",
      email: "m.wright@company.com",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Lagos, NG",
      type: "Contract",
      date: "Mar 05, 2023",
      status: "Onboarding",
    },
  ];
  {
    /* Add pagination logic inside the component */
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = employees.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  return (
    <div className="space-y-6">
      <div className="bg-white/30 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
                <th className="text-left px-6 py-4  text-sm font-semibold text-slate-600">
                  Employee
                </th>
                <th className="px-6 py-4  text-sm text-center font-semibold text-slate-600">
                  Job Title
                </th>
                <th className="px-6 py-4 text-sm text-center font-semibold text-slate-600">
                  Department
                </th>
                <th className="px-6 py-4  text-sm text-center font-semibold text-slate-600">
                  Location
                </th>
                <th className="px-6 py-4 text-sm text-center font-semibold text-slate-600">
                  Type
                </th>
                <th className="px-6 py-4 text-sm text-center font-semibold text-slate-600">
                  Start Date
                </th>
                <th className="px-6 py-4  text-sm text-center font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className=" bg-white/80 divide-y divide-slate-200/50 dark:divide-slate-700/50">
              {currentEmployees.map((emp, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {emp.name}
                    </p>
                    <p className="text-xs text-slate-500">{emp.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-300">
                    {emp.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-300">
                    {emp.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-300">
                    {emp.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-300">
                    {emp.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-300">
                    {emp.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span
                      className={`flex items-center justify-center px-5 py-0.5 w-full rounded-full text-sm ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : emp.status === "Onboarding"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      />
    </div>
  );
}
