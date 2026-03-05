import React, { useMemo } from "react";
import Pagination from "./Pagination";

const statusStyles = {
  Active: "bg-green-50 text-green-700 border-green-200/50",
  Onboarding: "bg-indigo-50 text-indigo-700 border-indigo-200/50",
  "On Leave": "bg-amber-50 text-amber-700 border-amber-200/50",
  Offboarded: "bg-red-50 text-red-700 border-red-200/50",
  Default: "bg-slate-50 text-slate-600 border-slate-200/50",
};

// Small component for status badges
function StatusBadge({ status }) {
  return (
    <span
      title={status}
      className={`inline-flex items-center justify-center min-w-32 px-4 py-1 rounded-full text-sm font-bold tracking-wider border ${
        statusStyles[status] || statusStyles.Default
      } transition-all duration-200`}
    >
      {status}
    </span>
  );
}

export default function EmployeesTableSection({ employees, onSelectEmployee }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.max(1, Math.ceil(employees.length / itemsPerPage));

  // Clamp current page to avoid invalid page numbers
  const clampedCurrentPage = Math.min(currentPage, totalPages);

  const currentEmployees = useMemo(() => {
    const startIndex = (clampedCurrentPage - 1) * itemsPerPage;
    return employees.slice(startIndex, startIndex + itemsPerPage);
  }, [clampedCurrentPage, employees]);

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
                  className="border-b hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onSelectEmployee?.(emp)}
                >
                  <td className="px-6 py-4">
                    <p className="font-bold text-blue-600 dark:text-white">
                      {emp.name}
                    </p>
                    <p className="text-xs text-slate-400">{emp.email}</p>
                  </td>

                  <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-300">
                    {emp.jobTitle}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-300">
                    {emp.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-300">
                    {emp.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-300">
                    {emp.employmentType}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-300">
                    {emp.startDate
                      ? new Date(emp.startDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <StatusBadge status={emp.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={clampedCurrentPage}
        totalPages={totalPages}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      />
    </div>
  );
}
