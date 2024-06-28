import Query from "./Query.js";

class Orders {
  static async getAllOrders() {
    const query = `
    SELECT orders.id, orders.date, orders.ref, orders.productsQuantity,
    orders.totalPrice, orders.users_id, users.firstname, users.lastname
    FROM orders
    JOIN users ON orders.users_id = users.id
    `;
    const response = await Query.run(query);
    return response;
  }

  static async getOrdersById(id) {
    const data = {id};
    const query = `
    SELECT orders.id, orders.date, orders.ref, orders.productsQuantity,
    orders.totalPrice, orders.users_id, users.firstname, users.lastname
    FROM orders
    JOIN users ON orders.users_id = users.id
    WHERE orders.id = ?
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async postAddOrders(data) {
    const query = `
    INSERT INTO orders (ref, productsQuantity, totalPrice, users_id)
    VALUES (?, ?, ?, ?)
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async patchEditOrders(id, body) {
    const data = {...body, id};
    const query = `
    UPDATE orders
    SET ref = ?, productsQuantity = ?, totalPrice = ?, users_id = ?
    WHERE id = ?
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async deleteOrdersById(id) {
    const data = id;
    const query = `DELETE FROM orders WHERE id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }
}


export default Orders;
