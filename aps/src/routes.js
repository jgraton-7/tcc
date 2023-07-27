import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


import Home from './component/Home';
import Login from './component/Login';
import NovoUsuario from './component/novoUsuario';
import EsqueciMinhaSenha from './component/EsqueciMinhaSenha'
import DetalhesItem from './component/detalheItens'
import Payment from './component/payment';


function AppRouter(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Cadastro' element={<NovoUsuario />} />
                <Route path='/resetPassword' element={<EsqueciMinhaSenha />} />
                <Route path='/home' element={<Home />} />
                <Route path='/home/:id' element={<DetalhesItem />} />
                <Route path='/payment' element={<Payment />} />
            </Routes>           
        </Router>
    );
}

export default AppRouter;