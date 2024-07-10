import { Router } from "express";
import isConnected from "../middlewares/isConnected.js";
import adminRequired from "../middlewares/adminRequired.js";
import generateRef from "../middlewares/generateRef.js";
import { allOrders, ordersById, ordersByUser, addOrders, editOrders, deleteOrders } from "../controllers/orders.controller.js";

const router = Router();

// Affichage de toutes les commandes
router.get("/", adminRequired, allOrders);

// Affichage de toutes les commandes pour utilisateur
router.get("/profil", isConnected, ordersByUser);

// Affichage d'une commande
router.get("/admin/:id", adminRequired, ordersById);

// Ajout d'une commande
router.post("/", isConnected, generateRef, addOrders);

// Modification d'une commande
router.patch("/:id", adminRequired, editOrders);

// Suppression d'une commande
router.delete("/:id", adminRequired, deleteOrders);


export default router;
