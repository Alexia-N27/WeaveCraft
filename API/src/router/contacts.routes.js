import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import { allMessages, messageById, addMessage, editMessage, deleteMessage } from "../controllers/contacts.controller.js";

const router = Router();

// Affichage de tous les messages
router.get("/", adminRequired, allMessages);

// Affichage d'un message
router.get("/:id", adminRequired, messageById);

// Ajout d'un message
router.post("/", addMessage);

// Modification d'un message
router.patch("/:id", adminRequired, editMessage);

// Suppression d'un message
router.delete("/:id", adminRequired, deleteMessage);

export default router;
