import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import { allCategories, categoriesById, addCategories, editCategories, deleteCategories } from "../controllers/categories.controller.js";

const router = Router();

// Affichage de toutes les catégories
router.get("/", allCategories);

// Affichage d'une catégorie
router.get("/:id", categoriesById);

// Ajout d'une catégorie
router.post("/", adminRequired, addCategories);

// Modification d'une categorie
router.patch("/:id", adminRequired, editCategories);

// Suppression d'une categorie
router.delete("/:id", adminRequired, deleteCategories);

export default router;
