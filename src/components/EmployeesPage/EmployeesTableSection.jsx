import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

export default function EmployeesTableSection({ employees }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Reset page when employees changes
  useEffect(() => {
    const id = setTimeout(() => setCurrentPage(1), 0);
    return () => clearTimeout(id);
  }, [employees]);

  const totalPages = Math.max(1, Math.ceil(employees.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = employees.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto bg-white/30 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Employee
              </th>
              <th className="px-6 py-4 text-sm text-center font-semibold text-slate-600">
                Job Title
              </th>
              <th className="px-6 py-4 text-sm text-center font-semibold text-slate-600">
                Department
              </th>
              <th className="px-6 py-4 text-sm text-center font-semibold text-slate-600">
                Location
              </th>
              <th className="px-6 py-4 text-sm text-center font-semibold text-slate-600">
                Type
              </th>
              <th className="px-6 py-4 text-sm text-center font-semibold text-slate-600">
                Start Date
              </th>
              <th className="px-6 py-4 text-sm text-center font-semibold text-slate-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/80 divide-y divide-slate-200/50 dark:divide-slate-700/50">
            {currentEmployees.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-slate-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              currentEmployees.map((emp) => (
                <tr
                  key={emp.id}
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
                      className={`flex items-center justify-center px-3 py-0.5 rounded-full text-sm ${
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
              ))
            )}
          </tbody>
        </table>
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
