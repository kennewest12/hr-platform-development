import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Calendar,
  UserPlus,
  Users,
} from "lucide-react";
export default function StatsGrid() {
  const stats = [
    {
      id: 1,
      title: "Total Employees",
      value: "247",
      trend: "up",
      icon: Users,
      change: "+12%",
      subtext: "from last month",
    },
    {
      id: 2,
      title: "Average Attendance",
      value: "8",
      trend: null,
      icon: UserPlus,
      change: "5 more",
      subtext: "next week",
    },
    {
      id: 3,
      title: "Pending Recruitment",
      value: "5",
      trend: null,
      icon: Calendar,
      change: "Birthdays",
      subtext: "& anniversaries",
    },
    {
      id: 4,
      title: "Payroll Processed",
      value: "12",
      trend: null,
      icon: Briefcase,
      change: "Across 6",
      subtext: "departments",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        return (
          <div
            className="bg-white p-4 rounded-lg shadow duration-300 group"
            key={index}
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
              <span className="text-xs font-normal">{stat.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
