import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import { AllRoles, rolesById, addRoles, editRoles, deleteRoles } from "../controllers/roles.controller.js";

const router = Router();

// Affichage de tout les rôles
router.get("/", adminRequired, AllRoles);

// Affichage d'un rôle
router.get("/:id", adminRequired, rolesById);

// Ajout d'un rôle
router.post("/", adminRequired, addRoles);

// Modification d'un rôle
router.patch("/:id", adminRequired, editRoles);

// suppression d'un rôle
router.delete("/:id", adminRequired, deleteRoles);

export default router;
