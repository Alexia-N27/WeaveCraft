import Query from "./Query.js";
import bcrypt from "bcrypt";

class Auth {
  static async postRegisterUsers(userData) {
    const queryInsertUser = `
    INSERT INTO users (firstname, lastname, email, password)
    VALUES (?, ?, ?, ?)
    `;

    const response = await Query.runWithParams(queryInsertUser, userData);
    return response;
  }

  static async postLoginUsers({ email, password}) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [user] = await Query.runWithParams(query, [email]);

    if(!user || !(await bcrypt.compare(password, user.password))) {
      return { error: "Email ou mot de passe incorrect." };
    }

    const infoUser = {
      firstname: user.firstname,
      roles_id: user.roles_id,
    };

    return { succes: "Connexion réussie !", user: infoUser };
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
    const data = {id};
    const query = `
    SELECT users.id, firstname, lastname, email, password, roles_id,
    roles.label AS roles_label
    FROM users
    JOIN roles ON users.roles_id = roles.id
    WHERE users.id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async getUserByEmail(data) {
    const query = `
    SELECT users.firstname, users.lastname, users.email, users.password, addresses.*
    FROM users
    LEFT JOIN addresses ON users.id = addresses.users_id
    WHERE users.email = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }

  static async patchEditUser(id, body) {
    const { firstname, lastname, email, password, roles_id } = body;
    let hashedPassword = password;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const data = [firstname, lastname, email, hashedPassword, roles_id, id];

    const query = `
    UPDATE users
    SET firstname = ?, lastname = ?, email = ?, password = ?, roles_id = ?
    WHERE id = ?
    `;

    const response = await Query.runWithParams(query, data);
    return response;
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
