import multer from "multer";
import path from "path";

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Dossier de destination pour les fichiers uploadés
  },
  filename: function (req, file, cb) {
    // Générer un nom unique pour chaque fichier
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname); // Récupère l'extension du fichier
    cb(null, uniqueSuffix + extname); // nom final du  fichier
  }
});

// Créer l'instance multer avec la configuration de stockage
const upload = multer({ storage: storage });

export default upload;
