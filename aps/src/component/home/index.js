

import React, { useState , useEffect } from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGear, faCalendarDays, faMoneyBill, faGauge, faMoon, faSun, faPlus} from '@fortawesome/free-solid-svg-icons'

import { Link , useNavigate} from 'react-router-dom'

import perfil from '../../assets/img/perfil.jpg'

import './index.css'

import axios from "axios"

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

let id_usuario

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October ', 'November ', 'December' ];

const datasets = [];



console.log(id_usuario)

const token = sessionStorage.getItem('Token');

function Home() {

  
  const options = {
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

  const optionsbar = {
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

  const [Tomadas, setTomadas] = useState([{}])

  const [User, setUser] = useState({
    name: '',
    cpf: '',
    sexo: ''
  });


  const [Consumo, setConsumo] = useState({
    consumoTotal: '',
    consumoEstimado: '',
    valoraPagar: '',
  });

  const [consumoTotalArray, setconsumoTotalArray] = useState([]);

    React.useEffect(() => {
    axios.post('http://34.151.196.197/ListaGeralTomadas', {"id" : id_usuario}).then((response) => {
      setconsumoTotalArray(response.data);
    }).catch(err => console.log(err));
  }, [consumoTotalArray]);


  React.useEffect(() => {
    axios.post('http://34.151.196.197/dadosConsumo', {"id" : id_usuario}).then((response) => {
      setConsumo(response.data);
    }).catch(err => console.log(err));
  }, [Consumo]);

  React.useEffect(() => {
    axios.post('http://34.151.196.197/ListaDeTomadas', {"id" : id_usuario}).then((response) => {
      setTomadas(response.data.results);  
    }).catch(err => console.log(err));
  }, [Tomadas]);

    const person = () =>{
      setUser({
        name: "jorge",
        cpf: "39514147820",
        sexo: 'M'
      });
    }

    const [stat, setStat] = useState({
        setStat: true
    })

    const alterarEstilo = () => {
      // Atualiza as variáveis CSS

      
      

      setStat(stat === true ? false : true)
      if(stat){
        document.documentElement.style.setProperty('--main-bg-color', '#0E0E0E');
        document.documentElement.style.setProperty('--second-bg-color', '#111022');
        document.documentElement.style.setProperty('--list-bg-outlet-1', '#252338');
        document.documentElement.style.setProperty('--list-bg-outlet-2', '#070C1F');
        document.documentElement.style.setProperty(' --navbar-bg-colot', '#2E2E48');
        document.documentElement.style.setProperty(' --list-bg-color-font', '#4ea7b6');
      }
      else{
        document.documentElement.style.setProperty('--main-bg-color', '#bce2db');
        document.documentElement.style.setProperty('--second-bg-color', 'white');
        document.documentElement.style.setProperty('--list-bg-outlet-1', '#eff7f5');
        document.documentElement.style.setProperty('--list-bg-outlet-2', '#cbdbd8');
        document.documentElement.style.setProperty(' --navbar-bg-colot', '#2E2E48');
        document.documentElement.style.setProperty(' --list-bg-color-font', '#4ea7b6');
      }
    };

    useEffect(() => {
      id_usuario = sessionStorage.getItem('idUsuario');
      person();
    }, []);

    let data = {
      labels,
      datasets: [
        {
          label: '2023',
          data: consumoTotalArray,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ],
    };


  // return <Line options={options} data={data} />;
  return(
    <div className='home'>
      <div className='navbar'>
          <img src={perfil}></img>
          <p>{User.name}</p>
          <ul>
            <li><a className='icon' href='/home'><FontAwesomeIcon icon={faGauge} className='fontAwesome' /><span className='textnavBar'>Dashboard</span></a></li>
            <li><a className='icon'><FontAwesomeIcon icon={faMoneyBill} className='fontAwesome' /><span className='textnavBar'>Payment</span></a></li>
            <li><a className='icon'><FontAwesomeIcon icon={faCalendarDays} className='fontAwesome' /><span className='textnavBar'>attendance</span></a></li>
            <li><a className='icon'  href='/addOutlet'><FontAwesomeIcon icon={faPlus} className='fontAwesome' /><span className='add outlet'>Add Outlet</span></a></li>
            <li><a className='icon'><FontAwesomeIcon icon={faGear} className='fontAwesome' /><span className='textnavBar'>Settings</span></a></li>
          </ul>
          <div>
            <button onClick={alterarEstilo}>
              {stat !== true ? <p><FontAwesomeIcon icon={faMoon} /></p> : <p><FontAwesomeIcon icon={faSun} /></p>}
            </button>
          </div>
      </div>
      <div className='content'>
        <div className='containerConsumo'>
          <div className='positionConsumo'>
          <div className='blockConsumo'>
            <p className='tilteConsumo'>Consumo total</p>
            <p className='valorConsumo'>{Consumo.consumoTotal} KWH</p>
          </div>
          <div className='blockConsumo'>
            <p className='tilteConsumo'>Consumo hoje</p>
            <p className='valorConsumo'>{Consumo.consumoDiario} KWH</p>
          </div>
          <div className='blockConsumo'>
            <p className='tilteConsumo'>Valor a paga</p>
            <p className='valorConsumo'>R$: {Consumo.valorPagar}</p>
          </div>
          </div>
        </div>
        <div className='containerGraficos'>
          <div>
            <div className='linechart'>
              <div>
                <Line options={options} data={data} />
              </div>
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
                    <div className={tomada.id_tomada % 2 !== 0 ? 'fundo1' : 'fundo2'}>
                     <div className='nameTomada2' key={tomada.id_tomada}><Link to={`/home/${tomada.id_tomada}`} className='linkTomada2'><p>{tomada.desc_tomada}</p></Link></div>
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;