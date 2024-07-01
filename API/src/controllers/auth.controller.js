import Auth from "../models/Auth.js";
import bcrypt from "bcrypt";

// Inscription des utilisateurs
const registerUsers = async (req, res) => {
  try {
    const {data} = req.body.email;
    const existingUser = await Auth.getUserByEmail(data);
    if(existingUser.length > 0) {
      return res
        .status(409)
        .json({ msg: "Cet utilisateur existe déjà." });
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword
    };

    const response = await Auth.postRegisterUsers(userData);
    res.status(201).json({ msg: "Inscription réussie", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

// Connexion utilisateurs
const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await Auth.getUserByEmail({email});

    if (!email || !password) {
      return res
      .status(400)
      .json({ msg: "Veuillez fournir un email et un mot de passe." });
    }

    if(!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: "Email ou mot de passe incorrect." });
    }

    const infoUser = {
      firstname: user.firstname,
      roles_id: user.roles_id,
    };

    req.session.user = infoUser;
    res.status(200).json({ msg: "Connexion réussie !", user: infoUser });
  } catch (error) {
    res.status(500).json({ msg: "Erreur lors de la connexion.", error: error.message });
  }
};

// Déconnexion utilisateur
const logoutUsers = async (req, res) => {
  req.session.destroy((error) => {
      if(error){
          return res.status(500).json({msg: "Erreur de serveur", error: error.message});
      }
      res.clearCookie("session_id");
      res.status(200).json({msg: "Déconnexion réussie"});
  });
};

// Affichage de tout les utilisateurs
const allUsers = async (req, res) => {
  try {
    const response = await Auth.getAllUser();
    res
    .status(200)
    .json({
      msg: "Tout les utilisateurs ont été récupéré avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message});
  }
};

// Affichage d'un utilisateur
const usersById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Auth.getUserById(id);

    if(response.length === 0) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res
    .status(200)
    .json({ msg: "Utilisateur récupéré avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur du serveur", error: error.message });
  }
};

// Profil utilisateur
const usersProfil = async (req, res) => {
  try {
    const { email } = req.params;
    const response = await Auth.getUserByEmail({email});

    if (response.length === 0) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res
    .status(200)
    .json({ msg: "Utilisateur récupéré avec succès", response });

  } catch (error) {
    res.status(500).json({ msg: "Erreur du serveur", error: error.message });
  }
};

// Modification d'un utilisateur
const editUsers = async (req, res) => {
  try {
    const { firstname, lastname, email, password, roles_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { firstname, lastname, email, password: hashedPassword, roles_id, id: req.params.id };

    const response = await Auth.patchEditUser(userData);
    console.log(userData);
    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    res.status(200).json({ msg: "Utilisateur modifié avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Suppression d'un utilisateur
const deleteUsers = async (req, res) => {
  try{
    const {data} = req.params.id;
    const response = await Auth.deleteUserById(data);

    if(response.affectedRows === 0) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json({ msg: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error });
  }
};


export { allUsers, usersById, usersProfil, registerUsers, loginUsers, logoutUsers, editUsers, deleteUsers };
