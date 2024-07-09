import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import isConnected from "../middlewares/isConnected.js";
import { allOrdersDetails, orderDetailsById, addOrderDetails, editOrderDetails, deleteOrderDetails } from "../controllers/orderDetails.controller.js";

const router = Router();

// Affichage de toutes les commandes détaillées
router.get("/", adminRequired, allOrdersDetails);

// Affichage d'une comande détaillée
router.get("/:id", adminRequired, orderDetailsById);

// Ajout d'une commande détaillée
router.post("/", isConnected, addOrderDetails);

// Modification d'une commande détaillée
router.patch("/:id", adminRequired, editOrderDetails);

// Suppression d'une commande détaillé
router.delete("/:id", adminRequired, deleteOrderDetails);


export default router;
