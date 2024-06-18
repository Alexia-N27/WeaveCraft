import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import { checkAuth, getAllUser, getUserById, registerUser, loginUser, logoutUser, editUser, deleteUser } from "../controllers/auth.js";

const router = Router();

// Session
router.get("/", checkAuth);

// Affichage de tout les utilisateur
router.get("/users", adminRequired, getAllUser);
// Affichage d'un utilisateur
router.get("/:id", adminRequired, getUserById);

// Inscription des utilisateurs
router.post('/register', registerUser);
// Connexion des utilisateurs
router.post('/login', loginUser);
// Déconnexion
router.get('/logout', logoutUser);

// Modification d'un utilisateur
router.patch("/:id", adminRequired, editUser);
// Suppression d'un utilisateur
router.delete("/:id", adminRequired, deleteUser);




export default router;
