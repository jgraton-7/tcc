import './index.css'

import { useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom';

import HookTomadas from '../../hooks'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faGear, faCalendarDays, faMoneyBill, faGauge, faMoon, faSun} from '@fortawesome/free-solid-svg-icons'

import perfil from '../../assets/img/perfil.jpg'



import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
      text: 'Consumo tomadas Ano ',
    },
  },
};

export const optionsbar = {
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

function DetalhesItem(){

  const txt = "Consumo tomadas Ano ";
  
  const {id} = useParams();
  
  const  [Tomadas]  = HookTomadas();
  
  const tomada = Tomadas[id - 1];

  const consumo = tomada.consumo[0] ;

  const consumoMes = consumo.consumo[0] ;

  const [mes, setMes] = useState([]);

  const MesDefaul = () =>{
    setMes(consumoMes.January);
  }

  useEffect(() => {
    MesDefaul();
    options.plugins.title.text = txt + 'January';
    
  }, []);

  const handleSelectChange = (event) => {
    if(event.target.value === 'January'){
      setMes(consumoMes.January);
      options.plugins.title.text = txt + 'January';
    }
    else if(event.target.value === 'February'){
      setMes(consumoMes.February);
      options.plugins.title.text = txt + 'February';
    }
    else if(event.target.value === 'March'){
      setMes(consumoMes.March);
      options.plugins.title.text = txt + 'March';
    }
    else if(event.target.value === 'April'){
      setMes(consumoMes.April);
      options.plugins.title.text = txt + 'April';
    }
    else if(event.target.value === 'May'){
      setMes(consumoMes.May);
      options.plugins.title.text = txt + 'May';
    }
    else if(event.target.value === 'June'){
      setMes(consumoMes.June);
      options.plugins.title.text = txt + 'June';
    }
    else if(event.target.value === 'July'){
      setMes(consumoMes.July);
      options.plugins.title.text = txt + 'July';
    }
    else if(event.target.value === 'August'){
      setMes(consumoMes.August);
      options.plugins.title.text = txt + 'August';
    }
    else if(event.target.value === 'September'){
      setMes(consumoMes.September);
      options.plugins.title.text = txt + 'September';
    }
    else if(event.target.value === 'October'){
      setMes(consumoMes.October);
      options.plugins.title.text = txt + 'October';
    }
    else if(event.target.value === 'November'){
      setMes(consumoMes.November);
      options.plugins.title.text = txt + 'November';
    }
    else if(event.target.value === 'December'){
      setMes(consumoMes.December);
      options.plugins.title.text = txt + 'December';
    }

  };

  console.log(consumoMes.February);

  const labels = [1, 2, 3, 4, 5, 6,7 ,8 ,9 ,10 ,11 ,12 ,13 ,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

  const data = {
    labels,
    datasets: [
      {
        label: '2023',
        data: mes,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };

  const [User, setUser] = useState({
    name: '',
    cpf: '',
    sexo: ''
  });

  return(
    <div className='home'>
      <div className='navbar'>
          <img src={perfil}></img>
          <p>{User.name}</p>
          <ul>
            <li><a className='icon' href='/home'><FontAwesomeIcon icon={faGauge} className='fontAwesome' /><span className='textnavBar'>Dashboard</span></a></li>
            <li><a className='icon'><FontAwesomeIcon icon={faMoneyBill} className='fontAwesome' /><span className='textnavBar'>Payment</span></a></li>
            <li><a className='icon'><FontAwesomeIcon icon={faCalendarDays} className='fontAwesome' /><span className='textnavBar'>attendance</span></a></li>
            <li><a className='icon'><FontAwesomeIcon icon={faGear} className='fontAwesome' /><span className='textnavBar'>Settings</span></a></li>
          </ul>
      </div>
      <div className='content'>
        <div className='containerConsumo'>
          <div className='positionConsumo'>
          <div className='blockConsumo'>
            <p className='tilteConsumo'>Consumo total</p>
            <p className='valorConsumo'>{consumo.consumoTotal}</p>
          </div>
          <div className='blockConsumo'>
            <p className='tilteConsumo'>Consumo estimada mensal</p>
            <p className='valorConsumo'>{consumo.consumoEstimado}</p>
          </div>
          <div className='blockConsumo'>
            <p className='tilteConsumo'>Valor a paga</p>
            <p className='valorConsumo'>{consumo.valoraPagar}</p>
          </div>
          </div>
        </div>
        <div className='containerGraficos'>
          <div>
            <div className='linechart'>
              <Line options={options} data={data} />
            </div>
            <div className='groupedBarChart'>
              <Bar options={optionsbar} data={data} />
            </div>
          </div>
          <div className='Tomadas'>
            <div className='consumoDia'>
              <div className='ListaTomadas'>
                <div className='name'>
                  <p className=''>Name</p>
                </div>
                <div className='status'>
                  <p className=''>Status</p>
                </div>
                <div>
                  {Tomadas.map( tomada => (
                    <div className={tomada.idTomada % 2 !== 0 ? 'fundo1' : 'fundo2'}>
                     <div className='nameTomada2' key={tomada.idTomada}><a href={`/home/${tomada.idTomada}`} className='linkTomada2'><p>{tomada.nameTomada}</p></a></div>
                     <div className='statusTomada2'><div className={tomada.status !== 'ativo' ? 'vermelho' : 'verde'}></div></div>
                    </div>
                  ))
                  }
                </div>
              </div>
              <div>
              </div>
            </div>
            <div className='consumoDia1'>
              <label>
                Escolha o mes:
              </label>
              <select name="mes" onChange={handleSelectChange}>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };

  export default DetalhesItem;