import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


import Home from './component/Home';
import Login from './component/Login';
import NovoUsuario from './component/novoUsuario';
import EsqueciMinhaSenha from './component/EsqueciMinhaSenha'

function AppRouter(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Cadastro' element={<NovoUsuario />} />
                <Route path='/resetPassword' element={<EsqueciMinhaSenha />} />
                <Route path='/home' element={<Home />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;