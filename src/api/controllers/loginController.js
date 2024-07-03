const jwt    = require('jsonwebtoken');
const dotenv = require("dotenv");
const MD5    = require('../../utils/md5Crypto.js');      
const db     = require('../../services/db.js');
const helper = require('../../helper.js');

dotenv.config();
const SECRET = process.env.SECRET;

async function login(req){
    let user = req.body.user; 
    const sql = "SELECT ID, NOME, SENHA FROM usuarios WHERE NOME = '" + user + "'";
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    if(data.length === 0){
        var response = {
            statusCode: 401,
            message: "Usuário não encontrado!",
            data:{
                user: user
            }
        };
    
        return response;
    }

    const validacaoSenha = MD5.compararMD5(req.body.password, data[0].SENHA);
    if(!validacaoSenha){
        var response = {
            statusCode: 401,
            body : {
                message: "Usuário e/ou senha não encontrado(s)!"
            }
        };
    
        return response;
    }

    const token = jwt.sign({user: req.body.user, idUser: data[0].ID}, SECRET, {expiresIn:  "20m"});
    var response = {
        statusCode: 200,
        body : {
            message: "Login realizado com sucesso!",
            token: token
        }
    };
    
    return response;    
}

module.exports = { login };