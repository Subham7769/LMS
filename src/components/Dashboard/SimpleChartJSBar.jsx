import React, { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';


Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SimpleChartJSBar = ({ data,width=600,height=400 }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  console.log(data)
  useEffect(() => {
    if (!data || !data.labels || !data.datasets) return;

    const ctx = canvasRef.current.getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }
    
    const values = data.datasets[0].data;
    const maxValue = Math.max(...values);
    const roundedMax = Math.ceil(maxValue / 5000) * 5000;
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        responsive: true,
        datalabels: {
          display: false, // disables all bar labels
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: context => `${context.parsed.y.toLocaleString()}`,
            },
          },
          legend: { display: false },
        },
        scales: {
          x: {
            title: { display: true, text: data.xAxisLabel },
          },
          y: {
            type: 'linear',
            beginAtZero: true,
            min: 0,
            // max: 350000, // Optionally fix a max to stretch small bars
            ticks: {
              stepSize: 5000, // Optional: define spacing
            },
            title: { display: true, text: data.yAxisLabel },
          },
        },
      },
    });
  }, [data]);

  return <canvas ref={canvasRef} width={width} height={height} className="p-4"></canvas>;
};

export default SimpleChartJSBar;
