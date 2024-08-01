import pool from "../config/db.js";

class Auth {
  static async postRegisterUsers(userData) {
    try {
      const queryInsertUser = `
      INSERT INTO users (firstname, lastname, email, password)
      VALUES (?, ?, ?, ?)
      `;
      const response = await pool.execute(queryInsertUser, userData);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getAllUser() {
    try {
      const query = `
      SELECT users.id, firstname, lastname, email, password, roles_id,
      roles.label AS roles_label
      FROM users
      JOIN roles ON users.roles_id = roles.id
      ORDER BY roles.label
      `;
      const response = await pool.query(query);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getUserById(id) {
    try {
      const query = `
      SELECT users.id, firstname, lastname, email, roles_id,
      roles.label AS roles_label,
      addresses.id AS address_id,
      address_type, street, complement, city, zip_code, country
      FROM users
      JOIN roles ON users.roles_id = roles.id
      LEFT JOIN addresses ON users.id = addresses.users_id
      WHERE users.id = ?`;
      const response = await pool.execute(query, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getUserByEmail(email) {
    try {
      const query = `
      SELECT users.id, users.firstname, users.lastname, users.email, users.password, users.roles_id
      FROM users
      WHERE users.email = ?`;
      const response = await pool.execute(query, [email]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getUserByEmailDetail(email) {
    try {
      const query = `
      SELECT users.firstname, users.lastname, users.email, users.password, users.roles_id, addresses.*
      FROM users
      LEFT JOIN addresses ON users.id = addresses.users_id
      WHERE users.email = ?`;
      const response = await pool.execute(query, [email]);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async patchEditUser(body) {
    try {
      const query = `
      UPDATE users
      SET firstname = ?, lastname = ?, email = ?, password = ?, roles_id = ?
      WHERE id = ?
      `;
      const response = await pool.execute(query, body);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteUserById(id) {
    try {
      const response = await pool.execute(`DELETE FROM users WHERE id = ?`, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default Auth;
