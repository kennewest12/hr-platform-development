import React from "react";
import AttendanceSummaryCard from "./AttendanceSummaryCard";
import ActionItemsCard from "./ActionItemsCard";

export default function WorkForceSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <AttendanceSummaryCard />
      </div>

      <div className="lg:col-span-2">
        <ActionItemsCard />
      </div>
    </div>
  );
}
