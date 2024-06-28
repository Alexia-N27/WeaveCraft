import Auth from "../models/Auth.js";

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
  // Destroy the current session
  req.session.destroy((err) => {
      if(err){
          // If an error occurs during session destruction, send a 500 status response with an error message
          return res.status(500).json({message: "Erreur de serveur"});
      }
      // Clear the session cookie
      res.clearCookie("session_id");
      // Send a 200 status response with a success message
      res.status(200).json({message: "Déconnexion réussie"});
  });
};

// Affichage de tout les utilisateurs
const allUsers = async (req, res) => {
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
const usersById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Auth.getUserById(id);

    if(!response) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json({ msg: "Utilisateur récupéré avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur du serveur", error });
  }
};

// Profil utilisateur
const usersProfil = async (req, res) => {
  try {
    const { email } = req.params;
    const response = await Auth.getUserByEmail(email);

    if (!response) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json({ msg: "Utilisateur récupéré avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur du serveur", error });
  }
};

// Modification d'un utilisateur
const editUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Auth.patchEditUser(id, req.body);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }
    res.json({ msg: "Utilisateur modifier avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de server", error });
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
