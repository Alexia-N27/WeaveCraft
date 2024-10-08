import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import generateRef from "../middlewares/generateRef.js";
import upload from "../config/multer-config.js";
import { allProducts, productsById, productsByCategory, addProducts, editProducts, deleteProducts } from "../controllers/products.controller.js";

const router = Router();

// Affichage de tout les produits
router.get("/", allProducts);

// Affichage d'un produit
router.get("/:id", productsById);

// Affichage des produits par categorie
router.get("/category/:id", productsByCategory);

// Ajout d'un produit
router.post("/", adminRequired, upload.single("picture"), generateRef, addProducts);

// Modification d'un produit
router.patch("/:id", adminRequired, upload.single("picture"), editProducts);

// Suppression d'un produit
router.delete("/:id", adminRequired, deleteProducts);

export default router;
