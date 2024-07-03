const dotenv = require("dotenv");
const jwt    = require('jsonwebtoken');
const md5    = require('../../utils/md5.js');      

const { createUser, findAllUsers, findUserByEmail, findUserByUsername } = require('../../services/categoryService.js');

dotenv.config();
const SECRET = process.env.SECRET;

async function login(req){
    let user = req.body.username;
    var data = await findUserByUsername(user);

    if(data.length === 0){
        let response = {
            statusCode: 401,
            message: "Usuário não encontrado!",
            data:{
                username: user
            }
        };
    
        return response;
    }

    const validatePassword = md5.comparePassword(req.body.password, data[0].password);
    if(!validatePassword){
        var response = {
            statusCode: 401,
            body : {
                message: "Usuário e/ou senha não encontrado(s)!"
            }
        };
    
        return response;
    }

    const token = jwt.sign({user: req.body.user, idUser: data[0].id}, SECRET, {expiresIn:  "20m"});
    var response = {
        statusCode: 200,
        body : {
            message: "Login realizado com sucesso!",
            token: token
        }
    };
    
    return response;    
}

async function register(req){
    let user = req.body.username;
    var data = await findUserByUsername(user);

    if(data.length !== 0){
        let response = {
            statusCode: 401,
            message: "Nome de usuário se encontra em uso!",
            data:{
                username: user
            }
        };
    
        return response;
    }

    let email = req.body.email;
    var data = await findUserByEmail(email);

    if(data.length !== 0){
        var response = {
            statusCode: 401,
            message: "Email informado se encontra em uso!",
            data:{
                username: user
            }
        };
    
        return response;
    }

    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    var data = await createUser(userData);

    var response = {
        statusCode: 200,
        body : {
            message: "Usuário criado com sucesso!",
            username: req.body.username,
            email: req.body.email
        }
    };
    
    return response;    
}

module.exports = { login, register };