const dotenv = require("dotenv");
const db     = require('../../services/db.js');
const helper = require('../../helper.js');

dotenv.config();

async function users(){
    const sql = "SELECT ID, NOME, SENHA FROM usuarios";
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);
    
    return data;
}

module.exports = { users };