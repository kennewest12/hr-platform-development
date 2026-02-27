import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchWorkforceData } from "../../data/workforce";

// Custom Label Component to match the image style
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  name,
  value,
  fill,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={fill} // Matches the color of the slice
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${name}: ${value}`}
    </text>
  );
};

export default function DepartmentPieChartCard() {
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetchWorkforceData().then((data) =>
      setDepartmentData(data.departments || []),
    );
  }, []);

  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#6B7280",
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-900">
          Department Distribution
        </h3>
        <p className="text-sm text-neutral-500">Current workforce breakdown</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={departmentData}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={renderCustomLabel}
            labelLine={false}
          >
            {departmentData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", borderRadius: 6 }}
            itemStyle={{ color: "#111827" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
