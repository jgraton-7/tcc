import { useState } from 'react';

function Tomadas() {
    const [Tomadas, setTomadas] = useState([
        {idTomada: 1, nameTomada: 'Tomada Computador', status:'ativo', consumo: [65, 59, 80, 81, 56, 55, 40, 98]},
        {idTomada: 2, nameTomada: 'Tomada Geladeira', status:'ativo', consumo: [65, 32, 80, 52, 56, 94, 12]},
        {idTomada: 3, nameTomada: 'Tomada Fogão', status:'inativo', consumo: [65, 9, 42, 28, 32, 94, 42]},
        {idTomada: 4, nameTomada: 'Tomada Banheiro', status:'inativo', consumo: [65, 14, 34, 81, 36, 97, 40]},
        {idTomada: 5, nameTomada: 'Tomada TV Sala', status:'ativo', consumo: [65, 59, 80, 73, 24, 55, 40]},
        {idTomada: 6, nameTomada: 'Tomada TV Quarto', status:'ativo', consumo: [65, 59, 80, 81, 56, 55, 40]},
        {idTomada: 7, nameTomada: 'Tomada Alexa', status:'ativo', consumo: [65, 59, 80, 81, 56, 55, 40]},
        {idTomada: 8, nameTomada: 'Tomada Sala', status:'inativo', consumo: [65, 59, 80, 81, 56, 55, 40]}
      ]);

  return [Tomadas];
}

export default Tomadas;