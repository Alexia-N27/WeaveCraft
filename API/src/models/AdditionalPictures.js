import Query from "./Query.js";

class Pictures {
  static async getAllPictures() {
    const query = `SELECT * FROM additionalPictures`;
    const response = await Query.run(query);
    return response;
  }

  static async getPicturesById(id) {
    const data = {id};
    const query = `
    SELECT additionalPictures.id, picture_src, alt, products_id
    FROM additionalPictures
    WHERE id = ?
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async postAddPictures(data) {
    const query = `
    INSERT INTO additionalPictures (picture_src, alt, products_id)
    VALUES (?, ?, ?)
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async patchEditPictures(id, body) {
    const data = {...body, id};
    const query = `
    UPDATE additionalPictures
    SET picture_src = ?, alt = ?, products_id = ?
    WHERE id = ?
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async deletePicturesById(id) {
    const data = id;
    const query = `DELETE FROM additionalPictures WHERE id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }
};

export default Pictures;
