

import React, { useState , useEffect } from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGear, faCalendarDays, faMoneyBill, faGauge, faMoon, faSun, faPlus} from '@fortawesome/free-solid-svg-icons'

import perfil from '../../assets/img/perfil.jpg'

import './index.css'

import { LineChart } from './LineChart';
import {GroupedBarChart} from './GroupedBarChart'

import axios from "axios"

function Home() {


  const [Tomadas, setTomadas] = useState([{
    "id_tomada": '',
    "desc_tomada": "",
    "status_tomada": "",
    "id_contratante_tomad": ""
  }])


  const [User, setUser] = useState({
    name: '',
    cpf: '',
    sexo: ''
  });


  const [Consumo, setConsumo] = useState({
    consumoTotal: '',
    consumoEstimado: '',
    valoraPagar: '',
    consumoTomadas: [],
  });

  React.useEffect(() => {
    axios.post('http://localhost:3000/dadosConsumo', {"token" : "12345"}).then((response) => {
      setConsumo(response.data);
      console.log(response.data)
    }).catch(err => console.log(err));
  }, []);


  React.useEffect(() => {
    axios.post('http://localhost:3000/ListaDeTomadas', {"id" : 16}).then((response) => {
      setTomadas(response.data.results);
      console.log(response.data.results);
    }).catch(err => console.log(err));
  }, []);

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
      person();
    }, []);


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
            <p className='tilteConsumo'>Consumo estimada mensal</p>
            <p className='valorConsumo'>{Consumo.consumoEstimado} KWH</p>
          </div>
          <div className='blockConsumo'>
            <p className='tilteConsumo'>Valor a paga</p>
            <p className='valorConsumo'>R$: {Consumo.valoraPagar}</p>
          </div>
          </div>
        </div>
        <div className='containerGraficos'>
          <div>
            <div className='linechart'>
              <LineChart ></LineChart>
            </div>
            <div className='groupedBarChart'>
              <GroupedBarChart></GroupedBarChart>
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;