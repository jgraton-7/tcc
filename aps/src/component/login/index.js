import './index.css'

function Login(){
    return(
        <div className="page">
        <form method="POST" class="formLogin">
            <h1>Login</h1>
            <label for="email">E-mail</label>
            <input type="email" placeholder="Digite seu e-mail" autofocus="true" className="login" />
            <label for="password">Senha</label>
            <input type="password" placeholder="Digite seu e-mail" className="password"/>
            <div className="links">
                <a href="/" className="alterarSenha">Esqueci minha senha</a>
                <a href="/" className="novaConta">Não tenho conta</a>
            </div>
            <input type="submit" value="Acessar" class="btn" />
        </form>
    </div>
    )

}


export default Login;