import pool from "../config/db.js";

class Contacts {
  static async getAllMessages() {
    try {
      const query = `
      SELECT contacts.id, firstname, lastname, email, subject, content,
      readMessage, created_at
      FROM contacts
      `;
      const response = await pool.query(query);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getMessageById(id) {
    try {
      const query = `
      SELECT contacts.id, firstname, lastname, email, subject, content,
      readMessage, created_at
      FROM contacts
      WHERE id = ?
      `;
      const response = await pool.execute(query, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async postAddMessage(data) {
    try {
      const query = `
      INSERT INTO contacts (firstname, lastname, email, subject, content)
      VALUES (?, ?, ?, ?, ?)
      `;
      const response = await pool.execute(query, data);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async patchEditMessage(body) {
    try {
      const query = `UPDATE contacts SET readMessage = ? Where id = ?`;
      const response = await pool.execute(query, body);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteMessageById(id) {
    try {
      const response = await pool.execute(`DELETE FROM contacts WHERE id = ?`, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default Contacts;
