import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import isConnected from "../middlewares/isConnected.js";
import { getAllUser, getUserById, registerUser, loginUser, logoutUser, editUser, deleteUser } from "../controllers/auth.controller.js";

const router = Router();

// Session
router.get("/", isConnected);

// Affichage de tout les utilisateur
router.get("/users", getAllUser);
// Affichage d'un utilisateur
router.get("/:id", adminRequired, getUserById);
// Route pour afficher la page profil(en fonction de l'email)


// Inscription des utilisateurs
router.post('/register', registerUser);
// Connexion des utilisateurs
router.post('/login', loginUser);
// Déconnexion - ajout middle isConnected
router.get('/logout', logoutUser);

// Modification d'un utilisateur
router.patch("/:id", adminRequired, editUser);
// Suppression d'un utilisateur
router.delete("/:id", adminRequired, deleteUser);




export default router;
