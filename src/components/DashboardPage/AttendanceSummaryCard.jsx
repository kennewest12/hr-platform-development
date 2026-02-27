import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { fetchWorkforceData } from "../../data/workforce";

export default function AttendanceSummaryCard() {
  const [attendanceData, setAttendanceData] = useState({
    totalEmployees: 0,
    active: 0,
    onLeave: 0,
  });
  useEffect(() => {
    fetchWorkforceData().then((data) => {
      setAttendanceData(data || []);
    });
  }, []);

  const activePercentage =
    attendanceData.totalEmployees > 0
      ? Math.round(
          (attendanceData.active / attendanceData.totalEmployees) * 100,
        )
      : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center mb-4">
        <Clock className="text-blue-600 w-5 h-5" />
        <h3 className="text-md font-bold text-gray-900 ml-2">
          Today's Attendance
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                attendanceData.active >= attendanceData.onLeave
                  ? "border-[#00C950] bg-[#00C950]"
                  : "border-[#99A1AF] bg-[#99A1AF]"
              }`}
            />
            <span className="text-gray-700 text-sm font-medium">
              In Office / Remote
            </span>
          </div>
          <span className="text-sm text-gray-400 font-mono">
            {attendanceData.active}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                attendanceData.onLeave > attendanceData.active
                  ? "border-amber-500 bg-amber-500"
                  : "border-[#99A1AF] bg-[#99A1AF]"
              }`}
            />
            <span className="text-gray-700 text-sm font-medium">
              Out / On Leave
            </span>
          </div>
          <span className="text-sm text-gray-400 font-mono">
            {attendanceData.onLeave}
          </span>
        </div>

        <div className="mt-4">
          <div className="w-full bg-[#99A1AF]/20 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#00C950] h-2.5 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${activePercentage}%` }}
            />
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
