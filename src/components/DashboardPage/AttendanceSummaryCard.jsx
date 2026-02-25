import React, { useState } from "react";
import { Clock } from "lucide-react";

export default function AttendanceSummaryCard() {
  const [selectedOption, setSelectedOption] = useState("in-office-remote");

  //Data Source
  const stats = {
    active: 189,
    onLeave: 58,
    total: 247,
  };

  // Dynamic Calculation
  const activePercentage = Math.round((stats.active / stats.total) * 100);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center mb-4">
        <Clock className="text-blue-600 w-5 h-5" />
        <h3 className="text-md font-bold text-gray-900 ml-2">
          Today's Attendance
        </h3>
      </div>

      <form className="flex flex-col gap-4">
        {/*   In Office / Remote*/}
        <div className="flex items-center justify-between group">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="attendanceStatus"
              value="in-office-remote"
              checked={selectedOption === "in-office-remote"}
              onChange={handleOptionChange}
              className="appearance-none w-4 h-4 rounded-full border-2 border-[#99A1AF] bg-[#99A1AF] checked:bg-[#00C950] checked:border-[#00C950] transition-all cursor-pointer"
            />
            <span className="text-gray-700 text-sm font-medium">
              In Office / Remote
            </span>
          </label>
          <span className="text-sm text-gray-400 font-mono">
            {stats.active}
          </span>
        </div>

        {/*  Out / On Leave */}
        <div className="flex items-center justify-between group">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="attendanceStatus"
              value="on-leave"
              checked={selectedOption === "on-leave"}
              onChange={handleOptionChange}
              className="appearance-none w-4 h-4 rounded-full border-2 border-[#99A1AF] bg-[#99A1AF] checked:bg-[#00C950] checked:border-[#00C950] transition-all cursor-pointer"
            />
            <span className="text-gray-700 text-sm font-medium">
              Out / On Leave
            </span>
          </label>
          <span className="text-sm text-gray-400 font-mono">
            {stats.onLeave}
          </span>
        </div>

        {/* Progressbar*/}
        <div className="mt-4">
          <div className="w-full bg-[#99A1AF]/20 rounded-full h-2.5">
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
      </form>
    </div>
  );
}
