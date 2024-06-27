import Query from "./Query.js";

class Contacts {
  static async getAllMessages() {
    const query = `SELECT * FROM contacts`;
    const response = Query.run(query);
    return response;
  }

  static async getMessageById(id) {
    const data = {id};
    const query = `
    SELECT contacts.id, firstname, lastname, email, subject, content,
    readMessage, created_at
    FROM contacts
    WHERE id = ?
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async postAddMessage(data) {
    const query = `
    INSERT INTO contacts (firstname, lastname, email, subject, content)
    VALUES (?, ?, ?, ?, ?)
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async patchEditMessage(id, body) {
    const data = {...body, id};
    const query = `
    UPDATE contacts
    SET readMessage = ?
    Where id = ?
    `;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async deleteMessageById(id) {
    const data = id;
    const query = `DELETE FROM contacts WHERE id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }
}

export default Contacts;
