import Pictures from "../models/AdditionalPictures.js";

// Affichage de toutes les images
const allPictures = async (req, res) => {
  try {
    const response = await Pictures.getAllPictures();
    res.json({
      msg: "Toutes les images ont été récupérées avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Affichage d'une image
const picturesById = async (req, res) => {
  try {
    const response = await Pictures.getPicturesById(req.params.id);
    if (!response) {
      return res.json({ msg: "Image non trouvée" });
    }
    res.json({ msg: "Image récupérée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Ajout d'une image
const addPictures = async (req, res) => {
  try {
    const response = await Pictures.postAddPictures(req.body);
    res.status(201).json({ msg: "Image ajoutée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Modification d'une image
const editPictures = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await Pictures.patchEditPictures(id, req.body);
    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Image non trouvée" });
    }
    res.json({ msg: "Image modifiées avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Suppression d'une image
const deletePictures = async (req, res) => {
  try {
    const response = await Pictures.deletePicturesById(req.params.id);
    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Image non trouvée" });
    }
    res.json({ msg: "Image supprimée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};


export { allPictures, picturesById, addPictures, editPictures, deletePictures };
