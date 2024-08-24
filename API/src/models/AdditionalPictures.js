import pool from "../config/db.js";

class Pictures {
  static async getAllPictures() {
    try {
      const query = `
      SELECT additionalPictures.id,
      additionalPictures.picture_src,
      additionalPictures.alt,
      additionalPictures.products_id,
      products.title AS products_name
      FROM additionalPictures
      JOIN products ON additionalPictures.products_id = products.id
      ORDER BY products.title
      `;
      const response = await pool.query(query);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getPicturesById(id) {
    try {
      const query = `
      SELECT additionalPictures.id,
      additionalPictures.picture_src,
      additionalPictures.alt,
      additionalPictures.products_id,
      products.title AS products_name
      FROM additionalPictures
      JOIN products ON additionalPictures.products_id = products.id
      WHERE additionalPictures.id = ?
      `;
      const response = await pool.execute(query, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async postAddPictures(data) {
    try {
      const query = `
      INSERT INTO additionalPictures (picture_src, alt, products_id)
      VALUES (?, ?, ?)
      `;
      const [response] = await pool.execute(query, [
        data.picture_src,
        data.alt,
        data.products_id
      ]);
      return response;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async patchEditPictures(body) {
    try {
      const query = `
      UPDATE additionalPictures
      SET picture_src = ?, alt = ?, products_id = ?
      WHERE id = ?
      `;
      const response = await pool.execute(query, body);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deletePicturesById(id) {
    try {
      const response = await pool.execute(`DELETE FROM additionalPictures WHERE id = ?`, [id]);
      return response[0];
    } catch (error) {
      return { error: error.message };
    }
  }
};

export default Pictures;
