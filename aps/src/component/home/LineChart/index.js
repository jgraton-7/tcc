import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Consumo tomadas Ano 2023',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October ', 'November ', 'December' ];

export const data = {
  labels,
  datasets: [
    {
      label: 'Tomada 1',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Tomada 2',
      data: [32, 93, 83, 15, 14, 32, 7],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
    label: 'Tomada 3',
    data: [74, 43, 12, 14, 55, 62, 37],
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
    label: 'Tomada 4',
    data: [34, 32, 45, 25, 64, 82, 2],
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
    label: 'Tomada 5',
    data: [42, 13, 32, 43, 76, 32, 84],
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
  ],
};

export function LineChart() {
  return(
    <div>
        <Line options={options} data={data} />
    </div>
  );
}
