import './index.css'
import { useState } from "react"
import axios from "axios"

import { useNavigate } from 'react-router-dom';


function Login(){

    const [email_usuario, setEmail] = useState('');
    const [senha_usuario, setSenha] = useState('');
    sessionStorage.clear();

    const navigate = useNavigate();

    const onChangeHandlerEmail = event => {
        setEmail(event.target.value);
     };

     const onChangeHandlerSenha = event => {
        setSenha(event.target.value);
     }

    function handleSubmit(event){

        event.preventDefault()
        const resposta = {
            "email_usuario": email_usuario,
            "senha_usuario":senha_usuario
        }
        axios.post("http://localhost:3000/Login", resposta)
        .then(resposta => {
                console.log("resposta api" + resposta.status)
                if(resposta.status === 200){
                    sessionStorage.setItem('idUsuario', resposta.data.id_usuario);
                    sessionStorage.setItem('Token', resposta.data.token);
                    navigate('/home');
                }
                else{
                    localStorage.clear();
                    navigate('/');
                }
        })
        .catch(err => console.log(err)) 
    }

    return(
    <div className="page">
        <form onSubmit={handleSubmit} class="formLogin" >
            <h1>Login</h1>
            <label>E-mail</label>
            <input type="email" placeholder="Digite seu e-mail" className="login"
                   onChange={onChangeHandlerEmail}
                   value={email_usuario} 
            />
            <label>Senha</label>
            <input type="password" placeholder="Digite seu e-mail" className="password"
                onChange={onChangeHandlerSenha}
                value={senha_usuario} 
            />
            <div className="links">
                <a href="/resetPassword" className="alterarSenha">Esqueci minha senha</a>
                <a href="/Cadastro" className="novaConta">Não tenho conta</a>
            </div>
            <input type="submit" value="Acessar" class="btn" />
        </form>
    </div>
    )

}


export default Login;