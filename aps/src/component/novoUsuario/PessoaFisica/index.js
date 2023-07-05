
export default function PessoaFisica(){
    return (
        <form method="POST" class="formLogin">

            <label for="nome">Nome</label>
            <input type="text" placeholder="Nome" className="nome"/>
            <label for="cpf">CPF</label>
            <input type="cpf" placeholder="CPF" className="cpf"/>
            <label for="admissao">Admissão</label>
            <input type="Admissao" placeholder="Admissao" autofocus="true" className="admissao" />
            <label for="gestor">CEP</label>
            <input type="text" placeholder="CEP" className="gestor"/>
            <label for="email">E-mail</label>
            <input type="email" placeholder="E-mail" autofocus="true" className="email" />
            <label for="telefone">Telefone</label>
            <input type="tel" placeholder="Telefone" className="telefone"/>
            <label for="senha">Senha</label>
            <input type="password" placeholder="Senha" className="senha"/>
            <label for="senha">Confirmar Senha</label>
            <input type="password" placeholder="Confirmar Senha" className="confirmar"/>

            <input type="submit" value="Cadastrar usuário" class="btn" />
        </form>
    );
}