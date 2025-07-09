import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const RechartsBarChart = ({ data, xAxisLabel = '', yAxisLabel = '', width = '100%', height = 300 }) => {
  if (!data?.labels || !data?.datasets?.length) return null;

  const dataset = data.datasets[0];
  const chartData = data.labels.map((label, index) => ({
    label,
    value: dataset.data[index],
  }));

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart data={chartData} margin={{ top: 40, right: 30, left: 40, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          label={{ value: xAxisLabel, position: 'insideBottom', offset: -5, fontSize: 14 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          label={{ value: yAxisLabel, angle: -90, position: 'outSideLeft',
            dx: -50, // shift the label further left
            style: { textAnchor: 'middle' },
            fontSize: 14
           }}
           tick={{ fontSize: 12 }}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip formatter={(value) => value.toLocaleString()} />
        <Bar
          dataKey="value"
          fill={dataset.backgroundColor}
          radius={[4, 4, 0, 0]}
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RechartsBarChart;
