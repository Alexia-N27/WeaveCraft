import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import isConnected from "../middlewares/isConnected.js";
import { allUsers, usersById, usersProfil, registerUsers, loginUsers, logoutUsers, editUsers, deleteUsers } from "../controllers/auth.controller.js";

const router = Router();

// Session
router.get("/");

// Affichage de tout les utilisateur
router.get("/users", adminRequired, allUsers);
// Affichage d'un utilisateur
router.get("/:id", adminRequired, usersById);
// Route pour afficher la page profil(en fonction de l'email)
router.get("/profil/:email", isConnected, usersProfil);

// Inscription des utilisateurs
router.post('/register', registerUsers);
// Connexion des utilisateurs
router.post('/login', loginUsers);
// Déconnexion - ajout middle isConnected
router.post('/logout', isConnected, logoutUsers);

// Modification d'un utilisateur
router.patch("/:id", editUsers);
// Suppression d'un utilisateur
router.delete("/:id", adminRequired, deleteUsers);




export default router;
