import pool from "../config/db.js";

class Products {
  static async getAllProduct() {
    try {
      const query = `
      SELECT products.id, title, undertitle, description, picture, alt,
      price, ref, quantityInStock, categories_id, categories.label AS categories_name
      FROM products
      JOIN categories ON products.categories_id = categories.id
      ORDER BY products.id DESC
      `;
      const response = await pool.query(query);
      return response[0];
    } catch (error) {
    }
  }

  static async getProductsById(id) {
    try {
      const query = `
      SELECT products.id, title, undertitle, description, picture, alt,
      price, ref, quantityInStock, categories_id, categories.label AS categories_name
      FROM products
      JOIN categories ON products.categories_id = categories.id
      WHERE products.id = ?
      `;
      const response = await pool.execute(query, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async postAddProducts(data) {
    try {
      const query = `
      INSERT INTO products (title, undertitle, description, picture, alt,
      price, ref, quantityInStock, categories_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const response = await pool.execute(query, data);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async patchEditProducts(body) {
    try {
      const query = `
      UPDATE products
      SET title = ?, undertitle = ?, description = ?, picture = ?, alt = ?,
      price = ?, ref = ?, quantityInStock = ?, categories_id = ?
      WHERE id = ?
      `;
      const response = await pool.execute(query, body);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteProductsById(id) {
    try {
      const response = await pool.execute(`DELETE FROM products WHERE id = ?`, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default Products;
