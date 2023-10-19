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
    console.log(elemento[index]);
    soma += elemento[index].valor ;
  }
  consumoMedio = soma / len;
  return consumoMedio;
}


app.post('/adicionarMedicaoTomada', (req, res) => {

  const mac_address = req.body.mac_address;
  // somatoria volt em 1 hora tomada
  const SomatarioVolt = req.body.volt;
  // somatoria amper em 1 hora tomada
  const SomatoriaAmper = req.body.amper;

  const volt = SomatarioVolt/60;
  const amper = SomatoriaAmper/60;

  const consumo_hora = (volt * amper)/1000;


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

})


app.get('/TesteESP', (req, res) => {
  // Obtenha os dados do corpo da requisição (request body)  

  res.json({message: new Date().toISOString()});

})

app.post('/calcularMediaConsumo', (req, res) => {
  // Obtenha os dados do corpo da requisição (request body)
  const consumoHora = req.body.consumo;
  console.log(media(consumoHora));

  res.status(200).json({message: "Media: " + media(consumoHora), status: 200 });

})

 app.post('/dadosConsumo', (req,res)=> {
  
  const token = req.body.token;

  const sqlQuery = `SELECT * FROM tbl_usuario WHERE authentication_token = '${token}'`;
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.log('Erro ao executar a consulta:', err);
      res.status(401).json({ error: 'falha em consutar o banco de dados' });
    }
    else {
      if(results.length != 1){
        res.status(401).json({ error: 'Token invalido' });
      }
      else if(token == results[0].authentication_token){


        res.status(200).json({
        consumoTotal: '352',
        consumoEstimado: '954',
        valoraPagar: '124,43',
        consumoTomadas: ['24', '32', '49', '52', '73']
        })
      }
      else{
        res.status(401).json({ error: 'Token invalido' });
      }
    } 
  });

})


app.post('/stadoRele1', (req, res) => {

  const valor = req.body.status
  res.json({valor});
})

app.post('/stadoRele2', (req, res) => {
    const https = require('https')
    
    const valor = req.body.status

    if(valor == 1){
      res.status(200).json({message: "ligado"});
    }
    else{
      res.status(200).json({message: "desligado"});

    }




})


app.post('/ListaDeTomadas', (req, res) => {
  
  const id = req.body.id;

  const sqlQuery = `SELECT * FROM tbl_usuario WHERE id_usuario = '${id}'`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results, next) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
    }
    else{
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

app.post('/calcularConsumoAtual', (req, res) => {

  const consumoAtual = req.body.consumo;


  res.status(200).json({message: consumoAtual, status: 200 });
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
    console.log(req.body);
    const email = req.body.email_usuario
    const login = JSON.stringify(req.body);
    console.log(login);

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
      res.json(results);
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
        console.log(results)
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


app.post('/Login', (req, res) => {
  // Obtenha os dados do corpo da requisição (request body)
  const email = req.body.email_usuario
  const senha = req.body.senha_usuario;

  // Monta a consulta SQL dinamicamente com os dados recebidos
  const sqlQuery = `SELECT * FROM tbl_usuario WHERE email_usuario = '${email}'`;

  // Executa a consulta ao banco de dados
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao executar a consulta' });
      return;
    }
    const user = results;
    if(email == user[0].email_usuario && senha == user[0].senha_usuario){
      res.status(200).json({message: "Successfully in Login", status: 200 , token: "daojmdf9a03j=f093fa9fjasaj903@"});
    }
    else{
      res.status(403).json({message: "Error in Login", status: 403, token: "daojmdf9a03j=f093fa9fjasaj903@"});
    }
  });


});



