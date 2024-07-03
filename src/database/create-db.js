const mysql = require('mysql2/promise');
const sequelize = require('dotenv');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração de conexão com o MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
});

// Nome do banco de dados a ser criado
const databaseName = process.env.DB_NAME || 'dasadb';

async function createDatabase() {
  try {
    // Conecta ao MySQL
    await connection.connect();

    // Cria o banco de dados se não existir
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);

    console.log(`Banco de dados '${databaseName}' criado com sucesso!`);
  } catch (error) {
    console.error('Erro ao criar o banco de dados:', error);
  } finally {
    // Fecha a conexão
    await connection.end();
  }
}

// Chama a função para criar o banco de dados ao iniciar o script
createDatabase();
