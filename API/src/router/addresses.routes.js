import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import isConnected from "../middlewares/isConnected.js";
import { AllAddresses, AddressesById, addAddresses, editAddresses, deleteAddresses } from "../controllers/addresses.controller.js";

const router = Router();

// Affichage de toute les adresses utilisateurs
router.get("/", adminRequired, AllAddresses);

// Affichage d'une adresse
router.get("/:id", isConnected, AddressesById);

// Ajout d'une adresse
router.post("/", addAddresses);

// Modification d'une adresse
router.patch("/:id", isConnected, editAddresses);

// Suppression d'une adresse
router.delete("/:id", isConnected, deleteAddresses);


export default router;
