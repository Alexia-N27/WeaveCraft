import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import { getAllAddresses, addAddresses, editAddresses, deleteAddresses } from "../controllers/addresses.controller.js";

const router = Router();

// Affichage de toute les adresses utilisateurs
router.get("/", getAllAddresses);

// Affichage d'une adresse ?


// Ajout d'une adresse
router.post("/", addAddresses);

// Modification d'une adresse
router.patch("/:id", editAddresses);

// Suppression d'une adresse
router.delete("/:id", deleteAddresses);


export default router;
