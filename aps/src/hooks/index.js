import React, { useState , useEffect } from 'react';

import axios from "axios"

function Tomadas() {
    const [Tomadas, setTomadas] = useState([
      {
        "idTomada": "",
        "nameTomada":"",
        "status":"",
        "consumo":[
           {
              "consumoTotal":"",
              "consumoEstimado":"",
              "valoraPagar":"",
              "consumo":[
                 {
                    "January":
                    [],
                    "February":
                    [],
                    "March":
                    [],
                    "April":
                    [],
                    "May":
                    [],
                    "June":
                    [],
                    "July":
                    [],
                    "August":
                    [],
                    "September":
                    [],
                    "October":
                    [],
                    "November":
                    [],
                    "December":
                    []
                 }
              ]
           }
        ]
     }]);



  return [Tomadas];
}

export default Tomadas;