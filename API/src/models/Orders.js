import pool from "../config/db.js";

class Orders {
  static async getAllOrders() {
    try {
      const query = `
      SELECT orders.id AS order_id,
      orders.date,
      orders.ref AS order_ref,
      orders.productsQuantity AS products_total,
      orders.totalPrice,
      orders.users_id,
      users.firstname,
      users.lastname
      FROM orders
      JOIN users ON orders.users_id = users.id
      `;
      const response = await pool.query(query);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getOrdersById(id) {
    try {
      const query = `
      SELECT orders.id AS order_id,
      orders.date,
      orders.ref AS order_ref,
      orders.productsQuantity AS products_total,
      orders.totalPrice,
      orders.users_id,
      users.firstname,
      users.lastname,
      orderDetails.products_id AS product_id,
      products.title AS product_title,
      products.ref AS product_ref,
      orderDetails.price AS product_price,
      orderDetails.quantity AS product_quantity
      FROM orders
      JOIN users ON orders.users_id = users.id
      JOIN orderDetails ON orderDetails.orders_id = orders.id
      JOIN products ON orderDetails.products_id = products.id
      WHERE orders.id = ?
      `;
      const response = await pool.execute(query, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getOrdersByUserId(userId) {
    try {
      const query = `
      SELECT orders.id AS order_id,
      orders.date,
      orders.ref AS order_ref,
      orders.productsQuantity AS products_total,
      orders.totalPrice,
      orders.users_id,
      orderDetails.products_id AS product_id,
      products.title AS product_title,
      products.ref AS product_ref,
      orderDetails.price AS product_price,
      orderDetails.quantity AS product_quantity
      FROM orders
      JOIN orderDetails ON orderDetails.orders_id = orders.id
      JOIN products ON orderDetails.products_id = products.id
      WHERE orders.users_id = ?
      `;
      const response = await pool.execute(query, [userId]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async postAddOrders(data) {
    try {
      const query = `
      INSERT INTO orders (ref, productsQuantity, totalPrice, users_id)
      VALUES (?, ?, ?, ?)
      `;
      const response = await pool.execute(query, data);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async patchEditOrders(body) {
    try {
      const query = `
      UPDATE orders
      SET ref = ?, productsQuantity = ?, totalPrice = ?, users_id = ?, status = ?
      WHERE id = ?
      `;
      const response = await pool.execute(query, body);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteOrdersById(id) {
    try {
      const response = await pool.execute(`DELETE FROM orders WHERE id = ?`, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }
};


export default Orders;
