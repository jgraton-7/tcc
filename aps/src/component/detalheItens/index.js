import { useParams } from 'react-router-dom'

import HookTomadas from '../../hooks'

function DetalhesItem(){

  
  const {id} = useParams();
  
  const  [Tomadas]  = HookTomadas();

  console.log(Tomadas);


  
  const tomada = Tomadas[id - 1];
 

  return (
    <div>
      <p>teste que sera carregado no site</p>
      <p>Tomada {id}</p>
      <p>Nome: {tomada.nameTomada}</p>
    </div>
  );
};

export default DetalhesItem;