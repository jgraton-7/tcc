
export default function PessoaJuridica(){
    return(
        <form method="POST" class="formLoginNovoUsuario">

            <label for="nome">Nome Da Emapresa</label>
            <input type="text" placeholder="Nome" className="nome"/>
            <label for="cpf">CNPJ</label>
            <input type="cpf" placeholder="CNPJ" className="CNPJ"/>
            <label for="gestor">CEP</label>
            <input type="text" placeholder="CEP" className="gestor"/>
            <label for="admissao">Estado</label>
            <input type="Admissao" placeholder="Estado" autofocus="true" className="Estado" />
            <label for="email">E-mail</label>
            <input type="email" placeholder="E-mail" autofocus="true" className="email" />
            <label for="telefone">Telefone</label>
            <input type="tel" placeholder="Telefone" className="telefone"/>
            <label for="senha">Senha</label>
            <input type="password" placeholder="Senha" className="senha"/>
            <label for="senha">Confirmar Senha</label>
            <input type="password" placeholder="Confirmar Senha" className="confirmar"/>

            <input type="submit" value="Cadastrar usuário" class="btnCadastro" />
        </form>
    );
}