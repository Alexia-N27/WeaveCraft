import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import { getAllAddress, addAddress, editAddress, deleteAddress } from "../controllers/address.js";

const router = Router();

// Affichage de toute les adresses utilisateurs
router.get("/", adminRequired, getAllAddress);

// Affichage d'une adresse ?


// Ajout d'une adresse
router.post("/", addAddress);

// Modification d'une adresse
router.patch("/:id", editAddress);

// Suppression d'une adresse
router.delete("/:id", deleteAddress);


export default router;
