import pool from "../config/db.js";

class Roles {
  static async getAllRoles() {
    try {
      const query = `SELECT id, label FROM roles`;
      const response = await pool.query(query);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getRolesById(id) {
    try {
      const query = `SELECT roles.id, label FROM roles WHERE id = ?`;
      const response = await pool.execute(query, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async postAddRoles(data) {
    try {
      const query = `
      INSERT INTO roles (label)
      VALUES (?)
      `;
      const response = await pool.execute(query, [data]);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async patchEditRoles(body) {
    try {
      const query = `UPDATE roles SET label = ? WHERE id = ?`;
      const response = await pool.execute(query, body);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteRolesById(id) {
    try {
      const response = await pool.execute(`DELETE FROM roles WHERE id = ?`, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default Roles;
