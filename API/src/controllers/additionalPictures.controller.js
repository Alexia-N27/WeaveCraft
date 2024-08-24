import Pictures from "../models/AdditionalPictures.js";

// Affichage de toutes les images
const allPictures = async (req, res) => {
  try {
    const response = await Pictures.getAllPictures();

    res
    .status(200)
    .json({
      msg: "Toutes les images ont été récupérées avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Affichage d'une image
const picturesById = async (req, res) => {
  try {
    const response = await Pictures.getPicturesById(req.params.id);

    if (!response) {
      return res.status(404).json({ msg: "Image non trouvée" });
    }
    res.status(200).json({ msg: "Image récupérée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Ajout d'une image
const addPictures = async (req, res) => {
  try {
    const { alt, products_id } = req.body;
    const picture_src = req.file ? req.file.filename : null; // Récupère le nom du fichier téléchargé

    if (!picture_src) {
      return res.status(400).json({ msg: "Aucune image téléchargée" });
    }

    // const pictureData = [picture_src, alt, products_id];

    const newPicture = {
      picture_src: req.file ? req.file.filename : null,
      alt: req.body.alt,
      products_id: req.body.products_id
    };

    const response = await Pictures.postAddPictures(newPicture);
    console.log(newPicture);

    if (response.error) {
      return res.status(500).json({
        msg: "Erreur lors de l'ajout de l'image",
        error: response.error
      });
    }

    res.status(201).json({ msg: "Image ajoutée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Modification d'une image
const editPictures = async (req, res) => {
  try {
    const { alt, products_id } = req.body;
    const picture_src = req.file ? req.file.filename : null;

    const pictureData = [picture_src, alt, products_id, req.params.id];

    const response = await Pictures.patchEditPictures(pictureData);

    if (response.error) {
      return res
        .status(500)
        .json({
          msg: "Erreur lors de la mise à jour de l'image",
          error: response.error.message
        });
    }

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Image non trouvée" });
    }
    res.status(200).json({ msg: "Image modifiées avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Suppression d'une image
const deletePictures = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Pictures.deletePicturesById(id);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Image non trouvée" });
    }
    res.status(200).json({ msg: "Image supprimée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};


export { allPictures, picturesById, addPictures, editPictures, deletePictures };
