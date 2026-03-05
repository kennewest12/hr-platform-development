// StatusBadge.js
import React from "react";

const statusStyles = {
  Active: "bg-green-50 text-green-700 border-green-200/50",
  Onboarding: "bg-indigo-50 text-indigo-700 border-indigo-200/50",
  "On Leave": "bg-amber-50 text-amber-700 border-amber-200/50",
  Offboarded: "bg-red-50 text-red-700 border-red-200/50",
  Default: "bg-slate-50 text-slate-600 border-slate-200/50",
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.Default;

  return (
    <span
      title={status}
      className={`inline-flex items-center justify-center  px-4 py-1 rounded-full text-sm font-bold tracking-wider border ${style} transition-all duration-200`}
    >
      {status}
    </span>
  );
}
