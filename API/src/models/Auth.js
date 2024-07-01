import Query from "./Query.js";

class Auth {
  static async postRegisterUsers(userData) {
    const queryInsertUser = `
    INSERT INTO users (firstname, lastname, email, password)
    VALUES (?, ?, ?, ?)
    `;
    const response = await Query.runWithParams(queryInsertUser, userData);
    return response;
  }

  static async getAllUser() {
    const query = `
    SELECT users.id, firstname, lastname, email, password, roles_id,
    roles.label AS roles_label
    FROM users
    JOIN roles ON users.roles_id = roles.id
    ORDER BY roles.label
    `;
    const response = await Query.run(query);
    return response;
  }

  static async getUserById(id) {
    const query = `
    SELECT users.id, firstname, lastname, email, password, roles_id,
    roles.label AS roles_label
    FROM users
    JOIN roles ON users.roles_id = roles.id
    WHERE users.id = ?`;
    const response = await Query.runWithParams(query, id);
    return response;
  }

  static async getUserByEmail(email) {
    const query = `
    SELECT users.firstname, users.lastname, users.email, users.password, users.roles_id, addresses.*
    FROM users
    LEFT JOIN addresses ON users.id = addresses.users_id
    WHERE users.email = ?`;
    const response = await Query.runWithParams(query, email);
    return response;
  }

  static async patchEditUser(body) {
    try {
      const query = `
      UPDATE users
      SET firstname = ?, lastname = ?, email = ?, password = ?, roles_id = ?
      WHERE id = ?
      `;

      const response = await Query.runWithParams(query, body);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  /**
     * Delete a user by id from the database.
     * @param {Object} data - Object contain id of the user to delete.
     * @returns {Promise} A promise that resolves to the query result or an error.
     */
  static async deleteUserById(data) {
    try {
      return await Query.runWithParams(`DELETE FROM users WHERE id = ?`, data);
    } catch (err) {
      return err;
    }
  }
}

export default Auth;
