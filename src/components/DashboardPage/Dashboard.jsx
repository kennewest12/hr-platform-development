import React from "react";
import SectionCard from "../SectionCard";
import StatsGrid from "./StatsGrid";
import WorkForceSection from "./WorkForceSection";
import ChartSection from "./ChartSection";
import BirthdayCard from "./BirthdayCard";
export default function Dashboard() {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Dashboard"
        description="Welcome back! Here's what's happening with your organization"
      />

      {/* {Stats Grid } */}
      <StatsGrid />
      <WorkForceSection />
      <ChartSection />
      <BirthdayCard />
    </div>
  );
}
