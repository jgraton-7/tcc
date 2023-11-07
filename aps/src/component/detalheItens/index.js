import './index.css'

import { useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Link , useNavigate} from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faGear, faCalendarDays, faMoneyBill, faGauge, faMoon, faSun} from '@fortawesome/free-solid-svg-icons'

import perfil from '../../assets/img/perfil.jpg'

import axios from "axios"

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

const token = sessionStorage.getItem('Token');

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

  const [Tomadas2, setTomadas2] = useState();
  const [Tomadas, setTomadas] = useState([{
    "id_tomada": '',
    "desc_tomada": "",
    "status_tomada": "",
    "id_contratante_tomad": ""
  }])
  const [Consumo, setConsumo] = useState([]);

  const {id} = useParams();

  const id_usuario = sessionStorage.getItem("idUsuario");
  
  let responseApi = [];

  const txt = "Consumo tomadas Ano ";  

  const [FiltorMes, setFiltorMes] = useState(0);

  const [consumoMes, setconsumoMes] = useState([]);
  
  React.useEffect(() => {
    axios.post('http://34.151.196.197/listaConsumoTomadaDia', {"id" : id_usuario, "id_tomada": id}).then((response) => {
      responseApi = (response.data);
      setconsumoMes(response.data[FiltorMes]);
      //console.log(responseApi[1]);
    }).catch(err => console.log(err));
  }, [Consumo, FiltorMes, id]);

  React.useEffect(() => {
    axios.post('http://34.151.196.197/ListaDeTomadas', {"id" : id_usuario}).then((response) => {
      setTomadas(response.data.results);
      //console.log(response.data.results);
    }).catch(err => console.log(err));
  }, [Consumo, id]);

  React.useEffect(() => {
    axios.post('http://34.151.196.197/listaConsumoTomada', {"id_tomada" : id}).then((response) => {
      setConsumo(response.data);
      console.log(response.data);
    }).catch(err => console.log(err));
  }, [Consumo, id]);

  useEffect(() => {
    setconsumoMes(responseApi[0])
  }, [id, FiltorMes]);

  const handleSelectChange = (event) => {
    if(event.target.value === 'January'){
      setFiltorMes(0);
      setconsumoMes(responseApi[0]);
      options.plugins.title.text = txt + 'January';
    }
    else if(event.target.value === 'February'){
      setFiltorMes(1);
      setconsumoMes(responseApi[1]);
      options.plugins.title.text = txt + 'February';
    }
    else if(event.target.value === 'March'){
      setFiltorMes(2);
      setconsumoMes(responseApi[2]);
      options.plugins.title.text = txt + 'March';
    }
    else if(event.target.value === 'April'){
      setFiltorMes(3);
      setconsumoMes(responseApi[3]);
      options.plugins.title.text = txt + 'April';
    }
    else if(event.target.value === 'May'){
      setFiltorMes(4);
      setconsumoMes(responseApi[4]);
      options.plugins.title.text = txt + 'May';
    }
    else if(event.target.value === 'June'){
      setFiltorMes(5);
      setconsumoMes(responseApi[5]);
      options.plugins.title.text = txt + 'June';
    }
    else if(event.target.value === 'July'){
      setFiltorMes(6);
      setconsumoMes(responseApi[6]);
      options.plugins.title.text = txt + 'July';
    }
    else if(event.target.value === 'August'){
      setFiltorMes(7);
      setconsumoMes(responseApi[7]);
      options.plugins.title.text = txt + 'August';
    }
    else if(event.target.value === 'September'){
      setFiltorMes(8);
      setconsumoMes(responseApi[8]);
      options.plugins.title.text = txt + 'September';
    }
    else if(event.target.value === 'October'){
      setFiltorMes(9);
      setconsumoMes(responseApi[9]);
      options.plugins.title.text = txt + 'October';
    }
    else if(event.target.value === 'November'){
      setFiltorMes(10);
      setconsumoMes(responseApi[10]);
      options.plugins.title.text = txt + 'November';
    }
    else if(event.target.value === 'December'){
      setFiltorMes(11);
      setconsumoMes(responseApi[11]);
      options.plugins.title.text = txt + 'December';
    }

  };


  const labels = [1, 2, 3, 4, 5, 6,7 ,8 ,9 ,10 ,11 ,12 ,13 ,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

  //console.log(consumoMes)
  let data = {
    labels,
    datasets: [
      {
        label: '2023',
        data: consumoMes,
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
          <div className='blockConsumoIntes'>
            <p className='tilteConsumo'>Consumo total</p>
            <p className='valorConsumo'>{Consumo.Consumototal} KWH</p>
          </div>
          <div className='blockConsumoIntes'>
            <p className='tilteConsumo'>Consumo hoje</p>
            <p className='valorConsumo'>{Consumo.consumoHoje} KWH</p>
          </div>
          <div className='blockConsumoIntes'>
            <p className='tilteConsumo'>Consumo Atual</p>
            <p className='valorConsumo'>{Consumo.ultimoConsumo} KWH</p>
          </div>
          <div className='blockConsumoIntes'>
            <p className='tilteConsumo'>Valor a paga</p>
            <p className='valorConsumo'>R$:{Consumo.totalAPagar}</p>
          </div>
          </div>
        </div>
        <div className='containerGraficos'>
          <div className='blockgraficosIten'>
            <div className='linechartIten'>
              <Line options={options} data={data} />
            </div>
            <div className='groupedBarChartIten'>
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
                    <div className={tomada.id_tomada % 2 !== 0 ? 'fundo1' : 'fundo2'}>
                     <div className='nameTomada2' key={tomada.id_tomada}><a href={`/home/${tomada.id_tomada}`} className='linkTomada2'><p>{tomada.desc_tomada}</p></a></div>
                     <div className='statusTomada2'><div className={tomada.status_tomada !== 1 ? 'vermelho' : 'verde'}></div></div>
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