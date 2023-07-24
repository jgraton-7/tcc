require("dotenv").config();

// app.js ou index.js

const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();

app.use(express.json()); 


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


app.post('/Login', (req, res) => {
    // Obtenha os dados do corpo da requisição (request body)
    console.log(req.body);
    const email = req.body.email_usuario
    const login = JSON.stringify(req.body);
    console.log(login);

    // Monta a consulta SQL dinamicamente com os dados recebidos
    const sqlQuery = `SELECT * FROM tbl_usuario where email_usuario = ${email.toString()}`;

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

