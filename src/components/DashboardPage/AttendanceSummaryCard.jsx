import React from "react";
import { Clock } from "lucide-react";

export default function AttendanceSummaryCard() {
  const stats = {
    active: 189,
    onLeave: 58,
    total: 247,
  };

  // Fix: Added fallback to 0 to prevent NaN if total is 0
  const activePercentage =
    stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center mb-4">
        <Clock className="text-blue-600 w-5 h-5" />
        <h3 className="text-md font-bold text-gray-900 ml-2">
          Today's Attendance
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {/* In Office / Remote - Green if active is majority */}
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            {" "}
            {/* Removed cursor-pointer */}
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                stats.active >= stats.onLeave
                  ? "border-[#00C950] bg-[#00C950]"
                  : "border-[#99A1AF] bg-[#99A1AF]"
              }`}
            />
            <span className="text-gray-700 text-sm font-medium">
              In Office / Remote
            </span>
          </div>
          <span className="text-sm text-gray-400 font-mono">
            {stats.active}
          </span>
        </div>

        {/* Out / On Leave Section */}
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                stats.onLeave > stats.active
                  ? "border-amber-500 bg-amber-500" // Changed to Amber for visual distinction
                  : "border-[#99A1AF] bg-[#99A1AF]"
              }`}
            />
            <span className="text-gray-700 text-sm font-medium">
              Out / On Leave
            </span>
          </div>
          <span className="text-sm text-gray-400 font-mono">
            {stats.onLeave}
          </span>
        </div>

        {/* Progressbar */}
        <div className="mt-4">
          <div className="w-full bg-[#99A1AF]/20 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#00C950] h-2.5 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${activePercentage}%` }}
            ></div>
          </div>
          <p className="text-[13px] text-gray-500 mt-2 flex items-baseline">
            <span className="text-[15px] font-bold mr-1 text-gray-700">
              {activePercentage}%
            </span>
            workforce active today
          </p>
        </div>
      </div>
    </div>
  );
}
