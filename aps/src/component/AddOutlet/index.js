import './index.css'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquarePlus, faSquareXmark, faSquarePen} from '@fortawesome/free-solid-svg-icons'

import HookTomadas from '../../hooks'

function AddOutlet(){
    
    const  [Tomadas]  = HookTomadas();

    return(
        <div className='AddOutlet'>
            <div className='box'>
                <div className='topSideBox'>
                    <div className='boxTitle'>
                        <p>Lista de tomadas</p>
                    </div>
                    <div className='boxButton'>
                        <button className='NovaTomada'>
                            <p>Nova Tomada</p>
                            <FontAwesomeIcon icon={faSquarePlus} className='squarePlus'/>
                        </button>
                    </div>
                </div>
                <div>
                    <table className='tableAddOutlet'>
                        <tr className='trAddOutlet'>
                            <th>id</th>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Edite</th>
                            <th>Remove</th>
                        </tr>
                        {
                            Tomadas.map( Tomada => (
                                <tr className='BackgroudWhite'>
                                    <td>{Tomada.idTomada}</td>
                                    <td>{Tomada.nameTomada}</td>
                                    <td><div className='statusTomada2'><div className={Tomada.status !== 'ativo' ? 'vermelho' : 'verde'}></div></div></td>
                                    <td><FontAwesomeIcon icon={faSquarePen} className='AddOutletIcon'/></td>
                                    <td><FontAwesomeIcon icon={faSquareXmark} /></td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AddOutlet;