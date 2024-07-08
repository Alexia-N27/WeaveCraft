import pool from "../config/db.js";

class Categories {
  static async getAllCategories() {
    try {
      const query = `SELECT label FROM categories`;
      const response = await pool.query(query);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getCategoriesById(id) {
    try {
      const query = `SELECT categories.id, label FROM categories WHERE id = ?`;
      const response = await pool.execute(query, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async postAddCategories(data) {
    try {
      const query = `INSERT INTO categories (label) VALUES (?)`;
      const response = await pool.execute(query, data);
      return response;
    } catch (error) {
      return { errror: error.message };
    }
  }

  static async patchEditCategories(body) {
    try {
      const query = `UPDATE categories SET label = ? WHERE id = ?`;
      const response = await pool.execute(query, body);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteCategoriesById(id) {
    try {
      const response = await pool.execute(`DELETE FROM categories WHERE id = ?`, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default Categories;
