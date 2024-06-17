import { Router } from "express";
// ajout du middlewares "import adminRequired from '../middlewares/adminRequired.js'"
import { registerUser, loginUser, logoutUser } from "../controllers/auth.js";

const router = Router();

// Session
// router.get("/", checkAuth);

// Affichage de tout les utilisateur

// Affichage d'un utilisateur

// Inscription des utilisateurs
router.post('/register', registerUser);
// Connexion des utilisateurs
router.post('/login', loginUser);
// Déconnexion
router.get('/logout', logoutUser);
// Modification d'un utilisateur

// Suppression d'un utilisateur





export default router;
