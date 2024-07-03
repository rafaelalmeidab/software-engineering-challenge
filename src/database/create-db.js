const mysql = require('mysql');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao MySQL.');

  // Criação do banco de dados
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`, (err, result) => {
    if (err) {
      console.error('Erro ao criar o banco de dados:', err);
      connection.end();
      return;
    }
    console.log(`Banco de dados '${DB_NAME}' criado com sucesso.`);
    connection.end();
  });
});
