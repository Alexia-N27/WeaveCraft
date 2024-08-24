import fs from "fs";
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const newDirectory = path.join(process.cwd(), "public/images");
    fs.mkdirSync(newDirectory, { recursive: true });
    cb(null, newDirectory);
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    const filename = uuidv4() + extension;
    cb(null, filename);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp|svg/;
    const isExtnameValid = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const isMimetypeValid = filetypes.test(file.mimetype);

    if (isMimetypeValid && isExtnameValid) {
      return cb(null, true);
    } else {
      cb(
        "Le poids de votre fichier doit être inférieur à 5Mo, format supporté: jpeg, jpg, png, webp, svg"
      );
    }
  },
}).single("avatar");
