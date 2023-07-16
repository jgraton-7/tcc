import { useParams } from 'react-router-dom'

import HookTomadas from '../../hooks'

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



function DetalhesItem(){
  const {id} = useParams();
  
  const  [Tomadas]  = HookTomadas();
  
  const tomada = Tomadas[id - 1];


  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October ', 'November ', 'December' ];

  const data = {
    labels,
    datasets: [
      {
        label: '2020',
        data: tomada.consumo,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
      

  return (
    <div>
      <p>teste que sera carregado no site</p>
      <p>Tomada</p>
      <Line options={options} data={data} />

    </div>
  );
  };

  export default DetalhesItem;