import Query from "../model/Query.js";
import bcrypt from "bcrypt";

// Vérifier si une session est ouverte
const checkAuth = (req, res) => {
  if(req.session.user) {
    console.log("session user")
    res.json({ message: "Utilisateur connecté", user: req.session.user });
  } else {
    console.log("Aucune session user");
    res.status(401).json({ message: "Utilisateur non connecté" });
  }
};

// Inscription des utilisateurs
const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const query1 = `SELECT * FROM users WHERE email = ?`;
    const existingUser = await Query.runWithParams(query1, {email: req.body.email});
    console.log(existingUser);
    if(existingUser && existingUser.length > 0) {
      return res.status(409).json({ msg: "Cet utilisateur existe déjà" });
    }

    const query2 = `INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
      }

    await Query.runWithParams(query2, newUser);
    res.status(201).json({ msg: "Inscription réussie" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erreur de serveur", error: error.message});
  }
};

// Connexion utilisateur
const loginUser = async (req, res) => {
  console.log(req.body);
  try {
    const {email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;

    const data = {email};
    const [user] = await Query.runWithParams(query, data);

    if(!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ msg: "Email ou mot de passe incorecte." });
    }

    const infoUser = {
      firstname: user.firstname,
      role_id: user.role_id,
    };

    req.session.user = infoUser;

    console.log('User logged in:', req.session.user);
    res.status(200).json({ msg: "Connexion réussie !", user: infoUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erreur lors de la connexion." });
  }
};

// Déconnexion utilisateur
const logoutUser = async (req, res) => {
  console.log("logging out user:", req.session.user);
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Erreur serveur"});
    }
    res.clearCookie("session_id");
    console.log("Utilisateur deconnecté avec succès.");
    res.status(200).json({ msg: "Déconnexion réussie."});
  });
};

// Affichage de tout les utilisateurs
const getAllUser = async (req, res) => {
  try {
    const query = `SELECT * FROM users`;
    const response = await Query.run(query);
    res.json({
      msg: "Je suis sur la route API pour récupérer tout les utilisateurs", response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error});
  }
};

// Affichage d'un utilisateur
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
    SELECT users.id, firstname, lastname, email, password, role_id
    FROM users
    WHERE users.id = ?`;

    const [response] = await Query.runWithParams(query, id);

    if(!response) return res.status(404).json({ msg: "Utilisateur non trouvé" });
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error });
  }
};

// Modification d'un utilisateur
const editUser = async (req, res) => {
  console.log("EDIT", req.params);
  console.log(req.body);
  try {
    const { id } = req.params;
    const query = `UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ?, role_id = ? WHERE id = ?`;
    const data = {...req.body, id};
    const response = await Query.runWithParams(query, data);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json({ msg: "Utilisateur modifier avec succès", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erreur de server", error });
  }
};

// Suppression d'un utilisateur
const deleteUser = async (req, res) => {
  console.log(req.params);
  try{
    const { id } = req.params;

    const queryAddress = `DELETE FROM addresses WHERE user_id = ?`;
    await Query.runWithParams(queryAddress, [parseInt(id, 10)]);

    const queryUser = `DELETE FROM users WHERE id = ?`;
    const response = await Query.runWithParams(queryUser, [parseInt(id, 10)]);

    if(response.affectedRows === 0) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json({ msg: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error });
  }
};


export { checkAuth, getAllUser, getUserById, registerUser, loginUser, logoutUser, editUser, deleteUser };
