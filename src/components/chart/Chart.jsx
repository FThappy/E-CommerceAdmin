import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./chart.css"

export default function Chart({title,data, dataKey, grid}) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      {/* /*chieu rong 4 thi chieu dai 1*/}
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          {grid && <CartesianGrid strokeDasharray="5 5" />}
          <XAxis dataKey="name" stroke="#19AADE" />
          <YAxis stroke="#19AADE" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
