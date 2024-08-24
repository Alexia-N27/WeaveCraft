import { Router } from "express";
import adminRequired from "../middlewares/adminRequired.js";
import upload from "../config/multer-config.js";
import { allPictures, picturesById, addPictures, editPictures, deletePictures } from "../controllers/additionalPictures.controller.js";

const router = Router();

// Affichage de toutes les images
router.get("/", allPictures);

// Affichage d'une image
router.get("/:id", picturesById);

// Ajout d'une image
router.post("/", adminRequired, upload.single("picture_src"), addPictures);

// Modification d'une image
router.patch("/:id", adminRequired, upload.single("picture_src"), editPictures);

// Suppression d'une image
router.delete("/:id", adminRequired, deletePictures);

export default router;
