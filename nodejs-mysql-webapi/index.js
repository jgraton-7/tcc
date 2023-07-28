require("dotenv").config();

// app.js ou index.js

const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();

app.use(express.json()); 


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



