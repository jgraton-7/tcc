import './index.css'

import Login from '../login'
import Home from '../home';

function NovoUsuario(){

    const pessoa = "fisica";
    let item = null;

    if(pessoa === 'fisica'){
        item = <Login />
    }
    else{
        item = <Home />
    }



    return(
        <div className="page">

        {item}
    </div>
    );
}


export default NovoUsuario;