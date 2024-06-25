import Query from "./Query.js";

class Roles {
  static async getAllRoles() {
    const query = `SELECT * FROM roles`;
    const response = await Query.run(query);
    return response;
  }

  static async getRolesById(id) {
    const query = `SELECT roles.id, label FROM roles WHERE id = ?`;
    const data = {id};
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async postAddRoles(data) {
    const query = `
    INSERT INTO roles (label)
    VALUES (?)
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async patchEditRoles(id, body) {
    const data = {...body, id};
    const query = `UPDATE roles SET label = ? WHERE id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async deleteRolesById(id) {
    const data = id;
    const query = `DELETE FROM roles WHERE id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }
}

export default Roles;
