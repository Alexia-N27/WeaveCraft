import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import { AllAddresses, AddressesById, addAddresses, editAddresses, deleteAddresses } from "../controllers/addresses.controller.js";

const router = Router();

// Affichage de toute les adresses utilisateurs
router.get("/", adminRequired, AllAddresses);

// Affichage d'une adresse
router.get("/admin/:id", adminRequired, AddressesById);

// Ajout d'une adresse
router.post("/", addAddresses);

// Modification d'une adresse
router.patch("/:id",  editAddresses);

// Suppression d'une adresse
router.delete("/:id", adminRequired, deleteAddresses);


export default router;
