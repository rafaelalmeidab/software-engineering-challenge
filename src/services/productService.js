const db     = require('./dbService.js');
const helper = require('../helpers/helper.js');

async function createProduct(productData) {
  const sql    = "INSERT INTO products (title, description, price, category_id, owner_id) VALUES (?, ?, ?, ?, ?)";
  const values = [productData.title, productData.description, productData.price, productData.category_id, productData.owner_id];
  const rows   = await db.query(sql, values);
  const data   = helper.emptyOrRows(rows);

  return data;
}

async function deleteProduct(productId) {
  const sql  = "DELETE FROM products WHERE id = ?";
  const rows = await db.query(sql, [productId]);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function findAllProducts(categoryFlag = null) {
  var sql  = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE category_id IS NOT NULL";
  if(categoryFlag){
    var sql  = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE category_id IS NULL";
  }
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function findProductById(productId) {
  const sql  = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE id = ?";
  const rows = await db.query(sql, [productId]);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function updateProduct(productData) {
  const sql    = "UPDATE products SET title = ?, description = ?, price = ?, category_id = ?, owner_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
  const values = [productData.title, productData.description, productData.price, productData.category_id, productData.owner_id, productData.id];
  const rows   = await db.query(sql, values);
  const data   = helper.emptyOrRows(rows);

  return data;
}

module.exports = {
  createProduct, deleteProduct, findAllProducts, findProductById, updateProduct
};
