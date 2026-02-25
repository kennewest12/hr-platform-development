import React from "react";
import GrowthChartCard from "./GrowthChartCard";
import DepartmentPieChartCard from "./DepartmentPieChartCard";

export default function ChartSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GrowthChartCard />
      <DepartmentPieChartCard />
    </div>
  );
}
