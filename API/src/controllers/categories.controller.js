import Categories from "../models/Categories.js";

// Affichage de toutes les catégories
const allCategories = async (req, res) => {
  try {
    const response = await Categories.getAllCategories();
    res.json({
      msg: "Toutes les catégories ont été récupérés avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Affichage d'une catégorie
const categoriesById = async (req, res) => {
  try {
    const response = await Categories.getCategoriesById(req.params.id);
    if (!response) {
      return res.json({ msg: "Categories Non trouvée" });
    }
    res.json({ msg: "Categorie récupérée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Ajout d'une catégorie
const addCategories = async (req, res) => {
  try {
    const response = await Categories.postAddCategories(req.body);
    res.status(201).json({ msg: "Categorie ajoutée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Modification d'une categorie
const editCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Categories.patchEditCategories(id, req.body);
    if(response.affectedRows === 0) {
      return res.status(404).json({ msg: "Categories non trouvé" });
    }
    res.json({ msg: "Categorie modifier avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Suppression d'une categorie
const deleteCategories = async (req, res) => {
  try {
    const response = await Categories.deleteCategoriesById(req.params.id);
    if (response.affectedRows === 0) {
      return res.json({ msg: "Catégories non trouvée" });
    }
    res.json({ msg: "Catégorie supprimée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};


export { allCategories, categoriesById, addCategories, editCategories, deleteCategories };
