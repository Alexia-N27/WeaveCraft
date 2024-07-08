import pool from "../config/db.js";

class Addresses {
  static async getAllAddresses() {
    try {
      const query = `
      SELECT addresses.id,
      addresses.address_type,
      addresses.street,
      addresses.complement,
      addresses.city,
      addresses.zip_code,
      addresses.country,
      addresses.users_id,
      users.firstname,
      users.lastname
      FROM addresses
      JOIN users ON addresses.users_id = users.id
      ORDER BY users.lastname ASC
      `;
      const response = await pool.query(query);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getAddressesById(id) {
    try {
      const query = `
      SELECT addresses.id,
      addresses.address_type,
      addresses.street,
      addresses.complement,
      addresses.city,
      addresses.zip_code,
      addresses.country,
      addresses.users_id,
      users.firstname,
      users.lastname
      FROM addresses
      JOIN users ON addresses.users_id = users.id
      WHERE addresses.id = ?
      `;
      const response = await pool.execute(query, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async postAddAddresses(data) {
    try {
      const query = `
      INSERT INTO addresses (address_type, street, complement, city, zip_code, country, users_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const response = await pool.execute(query, data);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async patchEditAddresses(body) {
    try {
      const query = `
      UPDATE addresses SET address_type = ?, street = ?, complement = ?, city = ?, zip_code = ?, country = ?, users_id = ?
      WHERE id = ?
      `;
      const response = await pool.execute(query, body);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteAddressesById(id){
    try {
      const response = await pool.execute(`DELETE FROM addresses WHERE id = ?`, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default Addresses;
