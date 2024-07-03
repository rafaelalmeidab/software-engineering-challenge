const dotenv = require("dotenv");
const { createCategory, deleteCategory, findAllCategories, findCategoryById, updateCategory } = require('../../services/categoryService.js');

dotenv.config();
const SECRET = process.env.SECRET;

async function erase(req) {
    let id = req.body.id;
    var data = await findCategoryById(id);

    if (data.length === 0) {
        let response = {
            statusCode: 401,
            message: "Categoria inexistente!",
            data: {
                category: id
            }
        };

        return response;
    }

    var dataCategory = data[0];

    var data = await deleteCategory(id);

    var response = {
        statusCode: 200,
        body: {
            message: "Categoria excluída com sucesso!",
            category: dataCategory.id,
            name: dataCategory.name,
            description: dataCategory.description
        }
    };

    return response;
}

async function list() {
    var data = await findAllCategories();

    if (data.length === 0) {
        let response = {
            statusCode: 401,
            message: "Não existem categorias cadastradas!"
        };

        return response;
    }

    var response = {
        statusCode: 200,
        body: {
            message: "Lista de categorias.",
            data: data
        }
    };

    return response;
}

module.exports = { erase, list };