import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import isConnected from "../middlewares/isConnected.js";
import { AllUser, UserById, registerUsers, loginUsers, logoutUsers, editUser, deleteUser } from "../controllers/auth.controller.js";

const router = Router();

// Session
router.get("/");

// Affichage de tout les utilisateur
router.get("/users", adminRequired, AllUser);
// Affichage d'un utilisateur
router.get("/:id", adminRequired, UserById);
// Route pour afficher la page profil(en fonction de l'email)


// Inscription des utilisateurs
router.post('/register', registerUsers);
// Connexion des utilisateurs
router.post('/login', loginUsers);
// Déconnexion - ajout middle isConnected
router.post('/logout', isConnected, logoutUsers);

// Modification d'un utilisateur
router.patch("/:id", adminRequired, editUser);
// Suppression d'un utilisateur
router.delete("/:id", adminRequired, deleteUser);




export default router;
