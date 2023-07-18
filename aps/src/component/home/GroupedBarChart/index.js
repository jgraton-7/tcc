import React from 'react';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Comparativo mes x mes por ano',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October ', 'November ', 'December' ];


export const data = {
  labels,
  datasets: [
    {
      label: '2020',
      data: [74, 43, 12, 14, 55, 62, 37],
      backgroundColor: 'rgb(255, 99, 132)',
      stack: 'Stack 0',
    },
    {
      label: '2021',
      data: [34, 32, 45, 25, 64, 82, 2],
      backgroundColor: 'rgb(75, 192, 192)',
      stack: 'Stack 1',
    },
    {
      label: '2022',
      data: [42, 13, 32, 43, 76, 32, 84],
      backgroundColor: 'rgb(53, 162, 235)',
      stack: 'Stack 2',
    },
    {
        label: '2023',
        data: [32, 47, 86, 27, 62, 23, 21],
        backgroundColor: 'rgb(23, 435   , 424)',
        stack: 'Stack 3',
    }
  ],
};

export function GroupedBarChart() {
  return <Bar options={options} data={data} />;
}
