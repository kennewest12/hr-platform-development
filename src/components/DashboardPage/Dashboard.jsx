import React from "react";
import StatsGrid from "./StatsGrid";
import WorkForceSection from "./WorkForceSection";
import ChartSection from "./ChartSection";
import BirthdayCard from "./BirthdayCard";
export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* {Stats Grid } */}
      <StatsGrid />
      <WorkForceSection />
      <ChartSection />
      <BirthdayCard />
    </div>
  );
}
