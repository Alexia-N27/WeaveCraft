import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import isConnected from "../middlewares/isConnected.js";
import { allProducts, productsById, addProducts, editProducts, deleteProducts } from "../controllers/products.controller.js";

const router = Router();

// Affichage de tout les produits
router.get("/", allProducts);

// Affichage d'un produit
router.get("/:id", productsById);

// Ajout d'un produit
router.post("/", addProducts);

// Modification d'un produit
router.patch("/:id", editProducts);

// Suppression d'un produit
router.delete("/:id", deleteProducts);

export default router;
