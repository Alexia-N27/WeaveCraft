import Categories from "../models/Categories.js";

// Affichage de toutes les catégories
const allCategories = async (req, res) => {
  try {
    const response = await Categories.getAllCategories();

    res
    .status(200)
    .json({
      msg: "Toutes les catégories ont été récupérés avec succès.",
      response
    });

  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Affichage d'une catégorie
const categoriesById = async (req, res) => {
  try {
    const response = await Categories.getCategoriesById(req.params.id);

    if (!response) {
      return res.status(404).json({ msg: "Categories Non trouvée" });
    }
    res.status(200).json({ msg: "Categorie récupérée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

// Ajout d'une catégorie
const addCategories = async (req, res) => {
  try {
    const { label } = req.body;

    const categoryData = [label];

    const response = await Categories.postAddCategories(categoryData);

    if (response.error) {
      return res.status(500).json({
        msg: "Erreur lors de l'ajout de la categorie",
        error: response.error
      });
    }

    res.status(201).json({ msg: "Categorie ajoutée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Modification d'une categorie
const editCategories = async (req, res) => {
  try {
    const { label } = req.body;

    const categoryData = [label, req.params.id];

    const response = await Categories.patchEditCategories(categoryData);

    if (response.error) {
      return res
        .status(500)
        .json({
          msg: "Erreur lors de la mise à jour de la catégorie",
          error: response.error.message
        });
    }

    if(response.affectedRows === 0) {
      return res.status(404).json({ msg: "Categories non trouvé" });
    }
    res.status(200).json({ msg: "Categorie modifier avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

// Suppression d'une categorie
const deleteCategories = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Categories.deleteCategoriesById(id);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Catégories non trouvée" });
    }
    res.status(200).json({ msg: "Catégorie supprimée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};


export { allCategories, categoriesById, addCategories, editCategories, deleteCategories };
