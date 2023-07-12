

import React, { useState , useEffect } from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGear, faCalendarDays, faMoneyBill, faGauge} from '@fortawesome/free-solid-svg-icons'

import perfil from '../../assets/img/perfil.jpg'

import './index.css'

import { LineChart } from './LineChart';
import {GroupedBarChart} from './GroupedBarChart'

function Home() {

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

  const [Tomadas, setTomadas] = useState([
    {idTomada: 1, nameTomada: 'Tomada Computador', status:'ativo'},
    {idTomada: 2, nameTomada: 'Tomada Geladeira', status:'ativo'},
    {idTomada: 3, nameTomada: 'Tomada Fogão', status:'inativo'},
    {idTomada: 4, nameTomada: 'Tomada Banheiro', status:'inativo'},
    {idTomada: 5, nameTomada: 'Tomada TV Sala', status:'ativo'},
    {idTomada: 6, nameTomada: 'Tomada TV Quarto', status:'ativo'},
    {idTomada: 7, nameTomada: 'Tomada Alexa', status:'ativo'}
  ]);


    const person = () =>{
      setUser({
        name: "jorge",
        cpf: "39514147820",
        sexo: 'M'
      });
    }

    const Cons = () =>{
      setConsumo({
        consumoTotal: '352',
        consumoEstimado: '954',
        valoraPagar: '120,43',
        consumoTomadas: ['24', '32', '49', '52', '73']
      })
    }

    useEffect(() => {
      person();
      Cons();
    }, []);


  // return <Line options={options} data={data} />;
  return(
    <div className='home'>
      <div className='navbar'>
          <img src={perfil}></img>
          <p>{User.name}</p>
          <ul>
            <li><a className='icon'><FontAwesomeIcon icon={faGauge} className='fontAwesome' />Dashboard</a></li>
            <li><a className='icon'><FontAwesomeIcon icon={faMoneyBill} className='fontAwesome' />Payment</a></li>
            <li><a className='icon'><FontAwesomeIcon icon={faCalendarDays} className='fontAwesome' />attendance</a></li>
            <li><a className='icon'><FontAwesomeIcon icon={faGear} className='fontAwesome' />Settings</a></li>
          </ul>
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
                    <div className={tomada.idTomada % 2 !== 0 ? 'fundo1' : 'fundo2'}>
                     <div className='nameTomada2'><a href={'/' + tomada.idTomada}><p>{tomada.nameTomada}</p></a></div>
                     <div className='statusTomada2'><div className={tomada.status != 'ativo' ? 'vermelho' : 'verde'}></div></div>
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