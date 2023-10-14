import 'index.css'

import perfil from '../../assets/img/perfil.jpg'



export default function Navbar(){
    return (
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
    )
}