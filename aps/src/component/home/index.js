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
      text: 'Consumo de energia eletrica',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: '2021',
      data: [32,323,322,3213 ,3213 ,3213, 3213 ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
        label: '2022',
        data: [32,323,3214,3213 ,432 ,253, 253 ],
        borderColor: 'rgb(255, 32, 132)',
        backgroundColor: 'rgba(255, 32, 132, 0.5)',
      },
    {
      label: '2023',
      data: [13,425,124,5436 ,432 ,153, 463 ],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function Home() {
  return <Line options={options} data={data} />;
}

export default Home;