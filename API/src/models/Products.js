import Query from "./Query.js";

class Products {
  static async getAllProduct() {
    const query = `SELECT * FROM products`;
    const response = await Query.run(query);
    return response;
  }

  static async getProductsById(id) {
    const data = {id};
    const query = `
    SELECT products.id, title, undertitle, description, picture, alt,
    price, ref, quantityInStock, categories_id
    FROM products
    WHERE id = ?
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async postAddProducts(data) {
    const query = `
    INSERT INTO products (title, undertitle, description, picture, alt,
    price, ref, quantityInStock, categories_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async patchEditProducts(id, body) {
    const data = {...body, id};
    const query = `
    UPDATE products
    SET title = ?, undertitle = ?, description = ?, picture = ?, alt = ?,
    price = ?, ref = ?, quantityInStock = ?, categories_id = ?
    WHERE id = ?
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async deleteProductsById(id) {
    const data = id;
    const query = `DELETE FROM products WHERE id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }
}

export default Products;
