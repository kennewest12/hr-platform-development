import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 mt-4">
      <div className="text-sm text-slate-900">
        Page <span className="font-medium text-slate-900">{currentPage}</span>
        of <span className="font-medium text-slate-900">{totalPages}</span>
      </div>
      <div className="flex gap-2">
        <button className="p-2 rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-colors">
          <ChevronLeft size={18} />
        </button>
        <button className="p-2 rounded-md border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-colors">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
