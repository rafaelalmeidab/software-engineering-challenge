const crypto = require('crypto');

// Função para calcular o hash MD5 de uma string
function calcularMD5(string) {
  const hash = crypto.createHash('md5');
  hash.update(string);
  return hash.digest('hex');
}

// Função para comparar uma string com seu hash MD5
function compararMD5(stringNormal, md5String) {
  const md5DaStringNormal = calcularMD5(stringNormal);
  return md5DaStringNormal === md5String;
}

// Exportando as funções para serem utilizadas em outros arquivos
module.exports = {
  calcularMD5,
  compararMD5
};
