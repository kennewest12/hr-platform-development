import React, { useState, useEffect } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer,
} from "recharts";
import { fetchWorkforceData } from "../../data/workforce";

export default function GrowthChartCard() {
  const [headcountGrowthData, setHeadcountGrowthData] = useState([]);

  useEffect(() => {
    fetchWorkforceData().then((data) =>
      setHeadcountGrowthData(data.headcountGrowth || []),
    );
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-900">
          Headcount Growth
        </h3>
        <p className="text-sm text-neutral-500">Last 7 months</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={headcountGrowthData}
          margin={{ top: 10, right: 35, bottom: 5, left: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />

          <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} />

          <YAxis
            domain={[0, 260]}
            ticks={[0, 65, 130, 195, 260]}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="headcount"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
