import pool from "../config/db.js";

class OrderDetails {
  static async getAllOrderDetails() {
    try {
      const query = `
      SELECT orderDetails.id AS orderDetails_id,
      orders_id AS order_id,
      orders.date AS order_date,
      orders.ref AS order_ref,
      products_id,
      price,
      quantity
      FROM orderDetails
      JOIN orders ON orderDetails.orders_id = orders.id
      `;
      const response = await pool.query(query);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getAllOrderDetailsById(id) {
    try {
      const query = `
      SELECT orderDetails.id AS orderDetails_id,
      orders_id AS order_id,
      orders.date AS order_date,
      orders.ref AS order_ref,
      products_id,
      price,
      quantity
      FROM orderDetails
      JOIN orders ON orderDetails.orders_id = orders.id
      WHERE orderDetails.id = ?
      `;
      const response = await pool.execute(query, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async postAddOrderDetails(data) {
    try {
      const query = `
      INSERT INTO orderDetails (orders_id, products_id, quantity, price)
      VALUES (?, ?, ?, ?)
      `;
      const response = await pool.execute(query, data);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async patchEditOrderDetails(body) {
    try {
      const query = `
      UPDATE orderDetails
      SET orders_id = ?, products_id = ?, quantity = ?, price = ?
      WHERE id = ?
      `;
      const response = await pool.execute(query, body);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteOrderDetailsById(id) {
    try {
      const response = await pool.execute(`DELETE FROM orderDetails WHERE id = ?`, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default OrderDetails;
