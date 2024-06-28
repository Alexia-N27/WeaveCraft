import Query from "./Query.js";

class OrderDetails {
  static async getAllOrderDetails() {
    const query = `
    SELECT orderDetails.id, orders_id, products_id, quantity, price,
    orders.date, orders.ref, orders.productsQuantity, orders.totalPrice
    FROM orderDetails
    JOIN orders ON orderDetails.orders_id = orders.id
    `;
    const response = await Query.run(query);
    return response;
  }

  static async getAllOrderDetailsById(id) {
    const data = {id};
    const query = `
    SELECT orderDetails.id, orders_id, products_id, quantity, price,
    orders.date, orders.ref, orders.productsQuantity, orders.totalPrice
    FROM orderDetails
    JOIN orders ON orderDetails.orders_id = orders.id
    WHERE orderDetails.id = ?
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async postAddOrderDetails(data) {
    const query = `
    INSERT INTO orderDetails (orders_id, products_id, quantity, price)
    VALUES (?, ?, ?, ?)
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async patchEditOrderDetails(id, body) {
    const data = {...body, id};
    const query = `
    UPDATE orderDetails
    SET orders_id = ?, products_id = ?, quantity = ?, price = ?
    WHERE id = ?
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async deleteOrderDetailsById(id) {
    const data = id;
    const query = `DELETE FROM orderDetails WHERE id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }
}

export default OrderDetails;
