import React, { useMemo } from "react";
import { Calendar, CircleDollarSign } from "lucide-react";

export default function EmploymentTab({ employee }) {
  const { startDate } = employee || {};

  const tenure = useMemo(() => {
    if (!startDate) return "-";

    const start = new Date(startDate);
    const now = new Date();

    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();

    const totalMonths = years * 12 + months;
    const finalYears = Math.floor(totalMonths / 12);
    const finalMonths = totalMonths % 12;

    return `${finalYears} years, ${finalMonths} months`;
  }, [startDate]); // use startDate directly

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "-";

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-12">
      <section>
        <h2 className="text-lg font-bold mb-8 text-slate-800">
          Employment Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16">
          <InfoField label="Job Title" value={employee?.jobTitle} />
          <InfoField label="Department" value={employee?.department} />
          <InfoField label="Employment Type" value={employee?.employmentType} />

          {/* Start Date */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Start Date
            </p>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Calendar size={16} className="text-slate-400" />
              <span>{formatDate(startDate)}</span>
            </div>
          </div>

          <InfoField label="Manager" value={employee?.manager} />

          {/* Salary */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Current Salary
            </p>

            <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
              <CircleDollarSign size={16} className="text-slate-400" />
              <span>
                {employee?.salary
                  ? `$${employee.salary.toLocaleString()}`
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-slate-100" />

      <section>
        <h2 className="text-lg font-bold mb-4 text-slate-800">
          Tenure at Company
        </h2>
        <p className="text-sm font-medium text-slate-600">{tenure}</p>
      </section>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-sm font-medium text-slate-700">{value || "-"}</p>
    </div>
  );
}
