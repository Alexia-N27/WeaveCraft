import Query from "./Query.js";
import bcrypt from "bcrypt";

class Auth {
  static async postRegisterUsers(userData) {
    const queryCheckUser = `SELECT * FROM users WHERE email = ?`;
    const existingUser = await Query.runWithParams(queryCheckUser, [userData.email]);
    if(existingUser.length > 0) {
      return { error: "Cet utilisateur existe déjà" };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const queryInsertUser = `
    INSERT INTO users (firstname, lastname, email, password)
    VALUES (?, ?, ?, ?)
    `;

    const newUser = [
      userData.firstname,
      userData.lastname,
      userData.email,
      hashedPassword
    ];

    const response = await Query.runWithParams(queryInsertUser, newUser);
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

  static async getLogoutUser(session) {
    return new Promise((resolve, reject) => {
      session.destroy(err => {
        if (err) {
          reject("Erreur lors de la déconnexion.");
        } else {
          resolve("Déconnexion réussie");
        }
      });
    });
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

  static async getUserByEmail(email) {
    const data = {email};
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

  static async deleteUserById(id) {
    const data = [id];
    const query = `DELETE FROM users WHERE id = ?`;
    const response = await Query.runWithParams(query, data);
    return response;
  }
}

export default Auth;
