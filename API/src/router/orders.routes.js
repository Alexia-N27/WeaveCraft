import { Router } from "express";
import isConnected from "../middlewares/isConnected.js";
import { allOrders, ordersById, addOrders, editOrders } from "../controllers/orders.controller.js";

const router = Router();

// Affichage de toutes les commandes
router.get("/", allOrders);

// Affichage de toutes les commandes pour l'utilisateur par email.

// Affichage d'une commande
router.get("/:id", ordersById);

// Affichage d'une commande pour l'utilisateur par email.

// Ajout d'une commande
router.post("/", isConnected, addOrders);

// Modification d'une commande
router.patch("/:id", editOrders);

// Suppression d'une commande



export default router;
