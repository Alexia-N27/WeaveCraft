import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import isConnected from "../middlewares/isConnected.js";
import { checkAuth, allUsers, usersById, usersProfil, registerUsers, loginUsers, logoutUsers, editUsers, deleteUsers } from "../controllers/auth.controller.js";

const router = Router();

// Route pour vérifier l'authentification de l'utilisateur
router.get("/", checkAuth);

// Affichage de tout les utilisateur
router.get("/users", adminRequired, allUsers);
// Affichage d'un utilisateur
router.get("/admin/:id", adminRequired, usersById);
// Route pour afficher la page profil(en fonction de l'email)
router.get("/profil", isConnected, usersProfil);

// Inscription des utilisateurs
router.post('/register', registerUsers);
// Connexion des utilisateurs
router.post('/login', loginUsers);
// Déconnexion
router.post('/logout', isConnected, logoutUsers);

// Modification d'un utilisateur
router.patch("/edit", isConnected, editUsers);
// Suppression d'un utilisateur
router.delete("/:id", adminRequired, deleteUsers);




export default router;
