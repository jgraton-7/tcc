import './index.css'

import React, {useState } from "react";

import PessoaFisica from './PessoaFisica';
import PessoaJuridica from './PessoaJuridica';



function NovoUsuario(){

    const [statu, setStatusPessoa] = useState();
    let item = null;


    const Fisica = () =>{
        setStatusPessoa("fisica");
    }

    const Juridica = () =>{
        setStatusPessoa("juridica");
    }

    if(statu === 'fisica'){
        item = <PessoaFisica />
    }
    else{
        item = <PessoaJuridica />
    }



    return(
        <div className="page">
        <div className='NovoUsuario'>
                <h1>Cadastrar usuário</h1>
                <div className='selectTypeUser'>
                    <div className='pessoaFisica'>
                        <span onClick={Fisica}>Sou Pessoa Fisica</span>
                    </div>
                    <div className='pessoaJuridica'>
                        <span  onClick={Juridica}>Sou Pessoa Juridica </span>
                    </div>
                </div>
                {item}
        </div>
    </div>
    );
}


export default NovoUsuario;