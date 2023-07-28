import './index.css'

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


const consumo = []

const modeloAtual = [
                    {marca: 'Electrolux ', modelo: 'DC35A ', consumo: 38.4},
                    {marca: 'Samsung', modelo: '', consumo: ''},
                    {marca: 'Consul', modelo: '', consumo: ''},
                    {marca: 'Panasonic', modelo: '', consumo: ''},
                    {marca: 'LG', modelo: '', consumo: ''},
                    {marca: 'Philco', modelo: '', consumo: ''},
                    {marca: 'Philco', modelo: '', consumo: ''}
                ]

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
            label: 'Projeçao Consumo geladeira atual',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
            label: 'Projeçao economia geladeira nova',
            data: [32, 93, 83, 15, 14, 32, 7],
            borderColor: 'rgba(93, 12, 278, 0.5)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
        };


function Payment(){
    return(
        <div>

            <label>Escolha a tomada que ira ser usada na comparação</label>
            <select name="Tomada">
                <option value="valor1">Valor 1</option>
                <option value="valor2">Valor 2</option>
                <option value="valor3">Valor 3</option>
            </select> 

            <label>Escolha o Eletronico que sera usada na comparação</label>
            <select name="Eletronico para comparação">
                <option value="valor1">Valor 1</option>
                <option value="valor2">Valor 2</option>
                <option value="valor3">Valor 3</option>
            </select>

            <Line options={options} data={data} />





        </div>






    );
}

export default Payment;