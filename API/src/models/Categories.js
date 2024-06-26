import Query from "./Query.js";

class Categories {
  static async getAllCategories() {
    const query = `SELECT label FROM categories`;
    const response = await Query.run(query);
    return response;
  }

  static async getCategoriesById(id) {
    const query = `SELECT categories.id, label FROM categories WHERE id = ?`;
    const data = {id};
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async postAddCategories(data) {
    const query = `
    INSERT INTO categories (label)
    VALUES (?)
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async patchEditCategories(id, body) {
    const data = {...body, id};
    const query = `UPDATE categories SET label = ? WHERE id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async deleteCategoriesById(id) {
    const data = id;
    const query = `DELETE FROM categories WHERE id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }
}

export default Categories;
