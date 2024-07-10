import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import generateRef from "../middlewares/generateRef.js";
import { allProducts, productsById, addProducts, editProducts, deleteProducts } from "../controllers/products.controller.js";

const router = Router();

// Affichage de tout les produits
router.get("/", allProducts);

// Affichage d'un produit
router.get("/:id", productsById);

// Ajout d'un produit
router.post("/", adminRequired, generateRef, addProducts);

// Modification d'un produit
router.patch("/:id", adminRequired, editProducts);

// Suppression d'un produit
router.delete("/:id", adminRequired, deleteProducts);

export default router;
