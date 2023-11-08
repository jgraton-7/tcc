require("dotenv").config();

// app.js ou index.js

const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();

app.use(express.json()); 

// Configurar o middleware CORS
const cors = require('cors')

app.use(cors());

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Verifica se a conexão foi estabelecida corretamente
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados!');
});

// Resto da configuração do Express e rotas do seu aplicativo aqui...

// Inicia o servidor na porta 3000 (ou a porta que você desejar)
app.listen(process.env.PORT, () => {
  console.log('Servidor rodando na porta 3000');
});


function media(elemento){

  const len = elemento.length;
  let consumoMedio = 0;
  let soma = 0;
  for (index in elemento){
    //console.log(elemento[index]);
    soma += elemento[index].valor ;
  }
  consumoMedio = soma / len;
  return consumoMedio;
}

function GenerateToken(length) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      token += caracteres.charAt(randomIndex);
  }
  return token;
}


function preencherMesesComZeros(dados) {
  const mesesCompletos = [];
  const mesesDoAno = 12; // Total de meses em um ano

  // Crie um objeto para mapear meses para seus valores
  const mapaMeses = {};
  dados.forEach(item => {
      const { ano, mes, soma } = item;
      const chave = ano * 100 + mes; // Combina ano e mês em uma única chave
      mapaMeses[chave] = soma;
  });

  for (let ano = 2023; ano <= 2023; ano++) {
      for (let mes = 1; mes <= mesesDoAno; mes++) {
          const chave = ano * 100 + mes;
          const soma = mapaMeses[chave] || 0;
          mesesCompletos.push({ ano, mes, soma });
      }
  }

  return mesesCompletos;
}

function preencherMesesDiaComZeros(dados) {
  const mesesCompletos = [];
  const mesesDoAno = 12; // Total de meses em um ano

  // Crie um objeto para mapear meses para seus valores
  const mapaMeses = {};
  dados.forEach(item => {
      const { ano, mes, dia , soma } = item;
      const chave = ano * 100 + mes * 10 + dia; // Combina ano e mês em uma única chave
      mapaMeses[chave] = soma;
  });

  for (let ano = 2023; ano <= 2023; ano++) {
      for (let mes = 1; mes <= mesesDoAno; mes++) {
          const chave = ano * 100 + mes;
          const soma = mapaMeses[chave] || 0;
          mesesCompletos.push({ ano, mes, soma });
      }
  }

  return mesesCompletos;
}

function preencherAnoMesDiaComZeros(dados) {
  const datasCompletas = [];
  
  const mapaDatas = {};
  dados.forEach(item => {
      const { ano, mes, dia, soma } = item;
      const chave = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
      mapaDatas[chave] = soma;
  });

  for (let ano = 2023; ano <= 2023; ano++) {
      for (let mes = 1; mes <= 12; mes++) {
          for (let dia = 1; dia <= new Date(ano, mes, 0).getDate(); dia++) {
              const chave = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
              const valor = mapaDatas[chave] || 0;
              datasCompletas.push({ ano, mes, dia, valor });
          }
      }
  }

  return datasCompletas;
}



app.post('/releEsp8266', (req, res) => {

  mac_address = req.body.mac_address;

  const sqlQuery = `SELECT status_tomada FROM tbl_tomada WHERE id_tomada = '${mac_address}'`

  connection.query(sqlQuery, (err, results) => { 
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else{
      res.status(200).json(results);
    }
  });
})


app.post('/ligaTomada', (req, res) => {

  //console.log(req.body);
  const mac_address = req.body.mac_address;

  const sqlQuery = `UPDATE tbl_tomada SET status_tomada = 1 WHERE id_tomada = '${mac_address}'`;

  connection.query(sqlQuery, (err, results) => { 
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else{
      res.status(200).json(results);
    }
  });
})

app.post('/adicionarMedicaoTomada', (req, res) => {

  const mac_address = req.body.mac_address;
  console.log("mac address :" + mac_address);
  // somatoria volt em 1 hora tomada
  const SomatarioVolt = req.body.volt;
  console.log("Volt :" + SomatarioVolt);
  // somatoria amper em 1 hora tomada
  const SomatoriaAmper = req.body.amp;
  console.log("Amp :" + SomatoriaAmper);

  const volt = SomatarioVolt;
  const amp = SomatoriaAmper/100;

  const consumo_hora = (volt * amp)/1000;
  
  let GROUP;
  if(amp >= 10 || volt > 180 ){
    const sqlQuery = `SELECT comodo_tomada FROM tbl_tomada WHERE id_tomada = '${mac_address}'`

    connection.query(sqlQuery, (err, results) =>{
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).json({ error: 'Erro ao executar a consulta' });
      }
      else{
        GROUP = results[0].comodo_tomada;
        const sqlQuery2 = `UPDATE tbl_tomada SET status_tomada = 0 WHERE id_tomada = '${mac_address}'`;
        // Executa a consulta ao banco de dados
        connection.query(sqlQuery2, (err, results) => { 
          if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).json({ error: 'Erro ao executar a consulta' });
          }
          else{
            // nao sei pq funciona mas funciona. Não mexer
            res.status(200).json(results);
          }
        });
      }
    })
  }
  else if(amp >= 15 || volt > 180 ){

    const sqlQuery = `SELECT comodo_tomada FROM tbl_tomada WHERE id_tomada = '${mac_address}'`

    connection.query(sqlQuery, (err, results) =>{
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).json({ error: 'Erro ao executar a consulta' });
      }
      else{
        GROUP = results[0].comodo_tomada;
        const sqlQuery2 = `UPDATE tbl_tomada SET status_tomada = 0 WHERE comodo_tomada = '${GROUP}'`;
        // Executa a consulta ao banco de dados
        connection.query(sqlQuery2, (err, results) => { 
          if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).json({ error: 'Erro ao executar a consulta' });
          }
          else{
            // nao sei pq funciona mas funciona. Não mexer
            res.status(200).json(results);
          }
        });
      }
    })
  }
  else{
    const sqlQuery = `INSERT INTO tbl_consumo (consumo_hora, data_consumo ,id_tomada_consumo) VALUES ('${consumo_hora}', CURRENT_TIMESTAMP(), '${mac_address}')`
    // Executa a consulta ao banco de dados
    connection.query(sqlQuery, (err, results) => { 
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).json({ error: 'Erro ao executar a consulta' });
      }
      else{
        res.status(200).json(results);
      }
    });
  }

})

app.post('/TesteESP', (req, res) => {
  // Obtenha os dados do corpo da requisição (request body)
  //console.log(req.body); 
  const volt = req.body.volt;
  const amp = req.body.amp;

 //console.log(volt);
  //console.log(amp);

  res.json({message: 'Volt : ' + volt + ' , Amper : ' + amp});

})

app.post('/calcularMediaConsumo', (req, res) => {
  // Obtenha os dados do corpo da requisição (request body)
  const consumoHora = req.body.consumo;
  //console.log(media(consumoHora));

  res.status(200).json({message: "Media: " + media(consumoHora), status: 200 });

})

 app.post('/dadosConsumo', (req,res)=> {
  
  const id = req.body.id;
  let consumoTotal = 0;
  let consumoDiario = 0;
  let consumo = 0;
  let date = new Date();
  const dia = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

  const sqlQuery = `SELECT id_tomada, SUM(consumo_hora) consumo_dia FROM tbl_consumo, tbl_tomada where id_contratante_tomad = '${id}' GROUP BY id_tomada;`;
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.log('Erro ao executar a consulta:', err);
      res.status(401).json({ error: 'falha em consutar o banco de dados' });
    }
    else {
        if(results.length !== 0){
          consumoTotal = results[0].consumo_dia.toFixed(2);
          consumo = (consumoTotal * 0.94).toFixed(2);
        }
        else{
          consumoDiario = 0;
          consumo = 0;
        }
        const sqlQuery2 =
        `SELECT id_tomada, SUM(consumo_hora) consumo_dia, DAY(data_consumo) dia FROM tbl_consumo, tbl_tomada where id_contratante_tomad = '${id}' AND data_consumo = '${dia}' GROUP BY id_tomada;`;
        connection.query(sqlQuery2, (err, results) => {
          if (err) {
            console.log('Erro ao executar a consulta:', err);
            res.status(401).json({ error: 'falha em consutar o banco de dados' });
          }
          else{
            if(results.length !== 0){
              consumoDiario = results[0].consumo_dia.toFixed(2);
            }
            else{
              consumoDiario = 0;
            }
            res.status(200).json({consumoTotal: consumoTotal, consumoDiario: consumoDiario, valorPagar: consumo})
          }
        })
      } 
  });
})

app.post('/TesteATMESP', (req, res) => {

  const valor = req.body.pino;
  //console.log(valor)
  res.status(200);
})


app.post('/ListaDeTomadas', (req, res) => {
  
  const id = req.body.id;

  const sqlQuery = `SELECT * FROM tbl_usuario WHERE id_contratante_usuar = '${id}'`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results, next) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else{
      if(results.length > 0){
        const sqlQuery2 = `SElECT * FROM tbl_tomada where id_contratante_tomad = '${results[0].id_contratante_usuar}' `
        connection.query(sqlQuery2, (err, results) => {
          if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).json({ error: 'Erro ao executar a consulta' });
          }
          else{
            res.status(200).json({results});
          }
        });
      }
      else{
        res.status(404).json({message: 'usuario não encontrado'});
      }
    }

  });

})

app.post('/listaConsumoTomadaMes', (req, res) => {
  // Obtenha os dados do corpo da requisição (request body)
  const id_tomada = req.body.id_tomada;
  const mes = req.body.mes;

  const sqlQuery = `select consumo_hora from tbl_consumo Where id_tomada_consumo = '${id_tomada}' and MONTH(data_consumo) = '${mes}' `
  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => { 
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else{
      res.status(200).json(results);
    }
  });
})

app.post('/listaConsumoTomadaDia', (req, res) => {
  
  const id_contratante = req.body.id;
  const id_tomada = req.body.id_tomada;

  const sqlQuery = 
    `SELECT YEAR(data_consumo), MONTH(data_consumo), DAY(data_consumo), SUM(consumo_hora)
    FROM tbl_consumo
    where id_tomada_consumo = '${id_tomada}'
    GROUP BY YEAR(data_consumo), MONTH(data_consumo), day(data_consumo);
    `;
  
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else{
      const arrayComponent = preencherAnoMesDiaComZeros(results);
      let data = [];
      let tmp = [];
      let mes = null;
      arrayComponent.forEach( iten => {
        if(mes == iten.mes || mes == null){
          tmp.push(iten.valor);
        }
        else{
          data.push(tmp);
          tmp = [];
          tmp.push(iten.valor)
        }
        mes = iten.mes;
      })
      data.push(tmp);
      //res.status(200).json(arrayComponent);
      //console.log(data.length);
      res.status(200).json(data);
    }
  });
});


app.post('/listaConsumoTomada', (req, res) => {

  const id = req.body.id_tomada;
  let consumoHoje;
  let valoraPagar;
  let Consumototal;
  let ultimoConsumo;

  let date = new Date();
  const dia = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

  let sqlQuery = `SELECT id_tomada_consumo, SUM(consumo_hora) AS soma FROM tbl_consumo WHERE id_tomada_consumo = '${id}';`;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else{
      //console.log(results);
      if(results.length !== 0 || results !== undefined || results[0].soma !== null){
        if( results[0].soma !== null){
          Consumototal = results[0].soma.toFixed(2);
        }
        else{
          Consumototal = 0;
        }
        valoraPagar = ((Consumototal) * 0.94).toFixed(2);
      }
      else{
        Consumototal = 0;
        valoraPagar = 0;
      }
      let sqlQuery2 = `SELECT id_tomada_consumo, SUM(consumo_hora) as soma FROM tbl_consumo WHERE data_consumo = '${dia}' AND id_tomada_consumo = '${id}';`
      connection.query(sqlQuery2, (err, results) => {
        if (err){
          res.status(500).json({ error: 'Erro ao executar a consulta' });
        }
        else{
          if (results[0].soma !== null){
            consumoHoje = results[0].soma.toFixed(2);
          }
          else{
            consumoHoje = 0.00;
          }
          let sqlQuery3 = `SELECT consumo_hora FROM tbl_consumo where id_tomada_consumo = '${id}' AND data_consumo = '${dia}' ORDER BY id_consumo DESC LIMIT 1;`
          connection.query(sqlQuery3, (err, results) => {
            if (err){
              res.status(500).json({ error: 'Erro ao executar a consulta' });
            }
            else{
              if(results.length != 0){
                ultimoConsumo = results[0].consumo_hora.toFixed(2);
              }
              else{
                ultimoConsumo = 0.00;
              }
            }
            res.status(200).json({Consumototal: Consumototal, consumoHoje: consumoHoje, totalAPagar: valoraPagar, ultimoConsumo: ultimoConsumo});
          })
        }
      })
    }

  });
})

app.post('/cadastrarContratante', (req, res) => {
  // Obtenha os dados do corpo da requisição (request body)
  const desc_contratante = req.body.desc_contratante;
  const plano_contratante = req.body.plano_contratante;
  const cpfcnpj_contratante = req.body.cpfcnpj_contratante;
  const cep_endereco_contr = req.body.cep_endereco_contr;
// 
  // Monta a consulta SQL dinamicamente com os dados recebidos
  const sqlQuery = `INSERT INTO tbl_contratante(desc_contratante ,plano_contratante, cpfcnpj_contratante, cep_endereco_contr)VALUES ('${desc_contratante}' , ${plano_contratante}, '${cpfcnpj_contratante}', '${cep_endereco_contr}')`

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else{
      res.status(201).json({message: "Successfully in register you Contractor", status: 200 });
    }

  });


})

app.post('/findContratante', (req, res) => {
  // Obtenha os dados do corpo da requisição (request body)
  const cpfcnpj_contratante = req.body.cpfcnpj_contratante;
  //estudar viabilidade de token de validacao para dado não possa ser visualisado por qualquer pessoa
 
  // Monta a consulta SQL dinamicamente com os dados recebidos
  const sqlQuery = ``

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else{
      res.status(201).json({message: "Successfully in register you Contractor", status: 200 });
    }
  });

})


app.post('/FindUser', (req, res) => {
    // Obtenha os dados do corpo da requisição (request body)
    //console.log(req.body);
    const email = req.body.email_usuario
    const login = JSON.stringify(req.body);

    // Monta a consulta SQL dinamicamente com os dados recebidos
    const sqlQuery = `SELECT * FROM tbl_usuario WHERE email_usuario = '${email}'`;

    // Executa a consulta ao banco de dados
    connection.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).json({ error: 'Erro ao executar a consulta' });
        return;
      }

      // Retorna os resultados da consulta como resposta
      res.status(200).json({results});
    });
  

});


app.post('/cadastrarUsuario', (req, res) => {
  // Obtenha os dados do corpo da requisição (request body)
  const nome = req.body.nome_usuario;
  const email = req.body.email_usuario;
  const senha = req.body.senha_usuario;
  const tipo = req.body.tipo_usuario;
  const id_contratante = req.body.id_contratante_usuar
// 


  // Monta a consulta SQL dinamicamente com os dados recebidos
  const sqlQuery = `INSERT INTO tbl_usuario (nome_usuario, email_usuario,senha_usuario,tipo_usuario,id_contratante_usuar)VALUES ('${nome}' , '${email}', '${senha}', '${tipo}', '${id_contratante}')`

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else{
      res.status(201).json({message: "Successfully in register you user", status: 200 });
    }

  });


})

//Falta testar e criar o script no insomnia
app.post('/RemoveUserByLogin', (req, res) => {


  const email = req.body.email_usuario;
  const senha = req.body.senha_usuario;


  // Monta a consulta SQL dinamicamente com os dados recebidos
  const  sqlQuery = `SELECT * FROM tbl_usuario WHERE email_usuario = '${email}' and senha_usuario = '${senha}' LIMIT 1`

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results, next) => {
    if(results.length == 0){
      res.status(500).json({message: "Usuario ou senha nao encontrado", status: 200 });
    }
    else{
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).json({ error: 'Erro ao executar a consulta1' });
      }
      else{
        //console.log(results)
        if(results != []){
          if(results[0].email_usuario == email && results[0].senha_usuario == senha){
            const id = results[0].id_usuario; 
            const  sqlQuery2 = `DELETE FROM tbl_usuario WHERE id_usuario = '${id}' `;  
            connection.query(sqlQuery2, (err, results) => {
              if(err){
                console.error('Erro ao executar a consulta:', err);
                res.status(500).json({ error: 'Erro ao executar a consulta3' });
              }
              else{
                res.status(201).json({message: 'Successfully in remove you user'})
              }
            })
          }
        }
        else{
          res.status(500).json({message: "Usuario ou senha nao encontrado", status: 200 });
        }
      }
    }
  });
})

app.post('/ListaGeralTomadas', (req, res) => {
  
  const id = req.body.id;

  const sqlQuery = 
    `SELECT YEAR(data_consumo) AS ano, MONTH(data_consumo) AS mes, SUM(consumo_hora) AS soma FROM tbl_consumo, tbl_tomada where id_contratante_tomad = '${id}' GROUP BY YEAR(data_consumo), MONTH(data_consumo) ORDER BY ano, mes;`;
  
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else{
      const meses = preencherMesesComZeros(results);
      const data = [];
      meses.forEach(mes => {
        data.push(mes.soma);
      });
      res.status(200).json(data);
    }
  });
});



app.post('/Login', (req, res) => {
  // Obtenha os dados do corpo da requisição (request body)
  const email = req.body.email_usuario
  const senha = req.body.senha_usuario;
  const token = GenerateToken(128);
  // Monta a consulta SQL dinamicamente com os dados recebidos
  const sqlQuery = `SELECT * FROM tbl_usuario WHERE email_usuario = '${email}'`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    const user = results;
    if(user.length > 1){
      if(email == user[0].email_usuario && senha == user[0].senha_usuario){
        const sqlQuery2 = `UPDATE tbl_usuario SET authentication_token = '${token}'WHERE email_usuario = '${email}'`;
        connection.query(sqlQuery2, (err, results) => {
          if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).json({ error: 'Erro ao executar a consulta' });
          }
          else{
            res.status(200).json({message: "Successfully in Login", status: 200 , autohenticate: 'autohenticate', token: token , id_usuario: user[0].id_contratante_usuar});
          }
        })
      }
      else{
        res.status(403).json({message: "Error in Login", status: 403});
      }
    }
    else{
      res.status(403).json({message: "Usuario não encontrado"})
    }
  });


});


