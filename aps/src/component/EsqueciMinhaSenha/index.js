import './index.css'


export default function EsqueciMinhaSenha(){
    return(
        <div>
            <div className="page">
                <form method="POST" class="formLogin">
                    <h1>Esqueci Minha Senha</h1>
                    <label for="email">E-mail</label>
                    <input type="email" placeholder="Digite seu e-mail" autofocus="true" className="E-mail" />
                    <input type="submit" value="Recuperar Senha" class="btn" />
                </form>
             </div>
        </div>
    );
}