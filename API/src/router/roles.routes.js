import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import { getAll, addRole, editRole, deleteRole } from "../controllers/roles.controller.js";

const router = Router();

// Affichage de tout les rôles
router.get("/", adminRequired, getAll);

// Ajout d'un rôle
router.post("/", adminRequired, addRole);

// Modification d'un rôle
router.patch("/:id", adminRequired, editRole);

// suppression d'un rôle
router.delete("/:id", adminRequired, deleteRole);

export default router;
