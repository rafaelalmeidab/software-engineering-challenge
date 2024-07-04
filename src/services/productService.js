const db     = require('./dbService.js');
const helper = require('../helpers/helper.js');

async function addProduct(productData) {
  var category_id = productData.category_id !== (undefined || '') ? productData.category_id : null;

  const sql    = "INSERT INTO products (title, description, price, category_id, owner_id) VALUES (?, ?, ?, ?, ?)";
  const values = [productData.title, productData.description, productData.price, category_id, global.loggedInUserId];
  const rows   = await db.query(sql, values);
  // const data   = helper.emptyOrRows(rows);

  const insertId = rows.insertId;
  const insertedProduct = await findProductById(insertId);
  return insertedProduct;
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

async function findProductByTitle(productTitle) {
  const sql  = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE title = ?";
  const rows = await db.query(sql, [productTitle]);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function updateProduct(productData) {
  const sql    = "UPDATE products SET title = ?, description = ?, price = ?, category_id = ?, owner_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
  const values = [productData.title, productData.description, productData.price, productData.category_id, global.loggedInUserId, productData.id];
  const rows   = await db.query(sql, values);
  const data   = helper.emptyOrRows(rows);

  return data;
}

async function updateProductCategory(productData) {
  const sql    = "UPDATE products category_id = ? WHERE id = ?";
  const values = [productData.category_id, productData.id];
  const rows   = await db.query(sql, values);
  const data   = helper.emptyOrRows(rows);

  return data;
}

module.exports = {
  addProduct, deleteProduct, findAllProducts, findProductById, findProductByTitle, updateProduct, updateProductCategory
};
