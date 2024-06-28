import { Router } from "express";
import { allOrderDetails, allOrderDetailsById, addOrderDetails, editOrderDetails, deleteOrderDetails } from "../controllers/orderDetails.controller.js";

const router = Router();

// Affichage de toutes les commandes détaillées
router.get("/", allOrderDetails);

// Affichage de toutes les commandes détaillée pour l'utilisateur par email.


//  Affichage d'une comande détaillée
router.get("/:id", allOrderDetailsById);

// Affichage d'une commande détaillée pour l'utilisateur par email.


// Ajout d'une commande détaillée
router.post("/", addOrderDetails);

// Modification d'une commande détaillée
router.patch("/:id", editOrderDetails);

// Suppression d'une commande détaillé
router.delete("/:id", deleteOrderDetails);


export default router;
