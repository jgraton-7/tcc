import { useState } from 'react';

function Tomadas() {
    const [Tomadas, setTomadas] = useState([
        {idTomada: 1, nameTomada: 'Tomada Computador', status:'ativo'},
        {idTomada: 2, nameTomada: 'Tomada Geladeira', status:'ativo'},
        {idTomada: 3, nameTomada: 'Tomada Fogão', status:'inativo'},
        {idTomada: 4, nameTomada: 'Tomada Banheiro', status:'inativo'},
        {idTomada: 5, nameTomada: 'Tomada TV Sala', status:'ativo'},
        {idTomada: 6, nameTomada: 'Tomada TV Quarto', status:'ativo'},
        {idTomada: 7, nameTomada: 'Tomada Alexa', status:'ativo'},
        {idTomada: 8, nameTomada: 'Tomada Sala', status:'inativo'}
      ]);

  return [Tomadas];
}

export default Tomadas;