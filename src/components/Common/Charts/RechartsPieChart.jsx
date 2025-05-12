import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Utility to convert HSL hue to RGB hex
const generateColor = (index) => {
  const hue = (index * 137.508) % 360; // golden angle approximation for spread
  return `hsl(${hue}, 70%, 60%)`;
};

const RechartsPieChart = ({ data, width = '100%', height = 300 }) => {
  if (!data?.labels || !data?.datasets?.length) return null;

  const dataset = data.datasets[0];
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: dataset.data[index],
  }));

  const predefinedColors = [
    '#0ea5e9', // sky
    '#8b5cf6', // violet
    '#10b981', // emerald
    '#f59e0b', // amber
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#ef4444', // red
    '#a855f7', // purple
    '#3b82f6', // blue
  ];

  const COLORS = chartData.map((_, i) =>
    i < predefinedColors.length ? predefinedColors[i] : generateColor(i)
  );

  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          label={({ name, value, percent }) =>
            percent > 0.03 ? `${name} (${value.toLocaleString()})` : ''
          }
          labelLine={({ percent }) => percent > 0.03}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => value.toLocaleString()} />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RechartsPieChart;
