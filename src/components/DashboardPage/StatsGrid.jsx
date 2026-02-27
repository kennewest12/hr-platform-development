import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Calendar,
  UserPlus,
  Users,
} from "lucide-react";
import { fetchWorkforceData } from "../../data/workforce";
export default function StatsGrid() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchWorkforceData().then((data) => {
      const newHires = data.newRecruit || [];

      // Recruitment logic

      const thisMonth = newHires.filter(
        (emp) => emp.period === "thisMonth",
      ).length;

      const nextWeek = newHires.filter(
        (emp) => emp.period === "nextWeek",
      ).length;

      const nextMonth = newHires.filter(
        (emp) => emp.period === "nextMonth",
      ).length;

      let hireValue = thisMonth;
      let hireSubtext = "No new hires";

      if (thisMonth > 0) {
        if (nextWeek > 0) {
          hireSubtext = `${nextWeek} more next week`;
        } else if (nextMonth > 0) {
          hireSubtext = `${nextMonth} starting next month`;
        } else {
          hireSubtext = "This month";
        }
      } else if (nextWeek > 0) {
        hireValue = nextWeek;
        hireSubtext = `${nextWeek} joining next week`;
      } else if (nextMonth > 0) {
        hireValue = nextMonth;
        hireSubtext = `${nextMonth} starting next month`;
      }

      // Upcoming Events Logic (Figma style)

      const events = data.upcomingEvents || [];

      const birthdays = events.filter((e) => e.type === "birthday").length;
      const anniversaries = events.filter(
        (e) => e.type === "anniversary",
      ).length;

      const eventValue = events.length;

      let eventSubtext = "No upcoming events";

      if (eventValue > 0) {
        if (birthdays > 0 && anniversaries > 0) {
          eventSubtext = "Birthdays & anniversaries";
        } else if (birthdays > 0) {
          eventSubtext = `${birthdays} birthday${birthdays > 1 ? "s" : ""}`;
        } else if (anniversaries > 0) {
          eventSubtext = `${anniversaries} anniversary${anniversaries > 1 ? "ies" : "y"}`;
        } else {
          eventSubtext = "Company events";
        }
      }

      // Open Positions Logic

      // Open Positions Logic
      const positions = data.openPositions || [];

      // Total number of open positions
      const totalPositions = positions.length;

      // Count unique departments
      const uniqueDepartments = [...new Set(positions.map((p) => p.department))]
        .length;

      // Display values for the card
      const positionValue = totalPositions; // main number
      const positionSubtext =
        totalPositions > 0
          ? `Across ${uniqueDepartments} department${uniqueDepartments > 1 ? "s" : ""}`
          : "Fully staffed";

      // Map the API data into the shape your stats cards expect
      setStats([
        {
          id: 1,
          title: "Total Employees",
          value: data.totalEmployees, // comes from workforceData
          trend: "up",
          icon: Users,
          iconColor: "text-[#155DFC]",
          change: "+12%",
          subtext: "from last month",
        },

        {
          id: 2,
          title: "New Hires This Month",
          value: hireValue,
          trend: null,
          icon: UserPlus,
          iconColor: "text-[#00A63E]",
          change: "",
          subtext: hireSubtext,
        },
        {
          id: 3,
          title: "Upcoming Events",
          value: eventValue,
          trend: null,
          icon: Calendar,
          iconColor: "text-[#9810FA]",
          change: "", // keep empty for clean look
          subtext: eventSubtext,
        },

        {
          id: 4,
          title: "Open Positions",
          value: positionValue,
          trend: null,
          icon: Briefcase,
          iconColor: "text-[#F54900]",
          change: "", // leave empty for clean Figma style
          subtext: positionSubtext,
        },
      ]);
    });
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        return (
          <div
            className="bg-white p-4 rounded-lg shadow duration-300 group"
            key={stat.id}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <div className="p-2 rounded-lg transition-transform duration-300 hover:scale-110">
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>

            <p className="text-3xl font-semibold text-gray-900 mb-2">
              {stat.value}
            </p>

            <div
              className={`flex items-center space-x-1.5 mt-2 ${
                stat.trend === "up"
                  ? "text-emerald-500"
                  : stat.trend === "down"
                    ? "text-red-500"
                    : "text-gray-400"
              }`}
            >
              {stat.trend === "up" && <ArrowUpRight className="h-4 w-4" />}
              {stat.trend === "down" && <ArrowDownRight className="h-4 w-4" />}

              <span className={"text-sm font-medium"}>{stat.change}</span>
              <span className="text-xs font-medium">{stat.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
