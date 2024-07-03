const dotenv = require("dotenv");
const { createProduct, deleteProduct, findAllProducts, findProductById, updateProduct } = require('../../services/productService.js');

dotenv.config();
const SECRET = process.env.SECRET;

async function erase(req){
    let id = req.body.id;
    var data = await findProductById(id);

    if(data.length === 0){
        let response = {
            statusCode: 401,
            message: "Produto inexistente!",
            data:{
                product: id
            }
        };
    
        return response;
    }

    var dataProduct = data[0];

    var data = await deleteProduct(id);

    var response = {
        statusCode: 200,
        body : {
            message: "Produto excluído com sucesso!",
            product: dataProduct.id,
            title: dataProduct.title,
            description: dataProduct.description,
            price: dataProduct.price,
            category_id: dataProduct.category_id,
            owner: dataProduct.owner
        }
    };
    
    return response;    
}


async function list(){
    var data = await findAllProducts();

    if(data.length === 0){
        let response = {
            statusCode: 401,
            message: "Não existem produtos cadastrados!"
        };
    
        return response;
    }

    var response = {
        statusCode: 200,
        body : {
            message: "Lista de produtos.",
            data: data
        }
    };
    
    return response;    
}

async function list2(){
    var data = await findAllProducts(true);

    if(data.length === 0){
        let response = {
            statusCode: 401,
            message: "Não existem produtos sem categoria cadastrados!"
        };
    
        return response;
    }

    var response = {
        statusCode: 200,
        body : {
            message: "Lista de produtos sem categoria.",
            data: data
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
        password: req.body.password
    };

    var data = await createUser(userData);

    var response = {
        statusCode: 200,
        body : {
            message: "Usuário criado com sucesso!",
            username: req.body.username,
        }
    };
    
    return response;    
}

module.exports = { erase, list, list2, register };