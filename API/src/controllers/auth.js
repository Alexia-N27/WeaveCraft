import Query from "../model/Query.js";
import bcrypt from "bcrypt";

// Vérifier si une session est ouverte

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


export { registerUser, loginUser, logoutUser };
