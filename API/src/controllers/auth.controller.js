import Query from "../models/Query.js";
import Auth from "../models/Auth.js";

// Inscription des utilisateurs
const registerUsers = async (req, res) => {
  try {
    const userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    };

    const response = await Auth.postRegisterUsers(userData);
    if (response.error) {
      return res.status(409).json({ msg: response.error });
    }

    res.status(201).json({ msg: "Inscription réussie", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Connexion utilisateurs
const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await Auth.postLoginUsers({ email, password });

    if(response.error) {
      return res.status(401).json({ msg: response.error });
    }

    req.session.user = response.user;
    res.status(200).json({ msg: response.succes, user: response.user });
  } catch (error) {
    res.status(500).json({ msg: "Erreur lors de la connexion." });
  }
};

// Déconnexion utilisateur
const logoutUsers = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ msg: "Utilisateur non connecté." });
    }

    const response = await Auth.getLogoutUser(req.session);

    res.clearCookie("session_id");

    res.status(200).json({ msg: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

// Affichage de tout les utilisateurs
const AllUser = async (req, res) => {
  try {
    const response = await Auth.getAllUser();
    res.json({
      msg: "Tout les utilisateurs ont été récupéré avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error});
  }
};

// Affichage d'un utilisateur
const UserById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Auth.getUserById(id);

    if(!response) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json({ msg: "Utilisateur récupéré avec succès", response });
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
    const query = `UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ?, roles_id = ? WHERE id = ?`;
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

    // const queryAddress = `DELETE FROM addresses WHERE user_id = ?`;
    // await Query.runWithParams(queryAddress, [parseInt(id, 10)]);

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


export { AllUser, UserById, registerUsers, loginUsers, logoutUsers, editUser, deleteUser };
