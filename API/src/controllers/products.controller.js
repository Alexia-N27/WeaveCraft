import Products from "../models/Products.js";

// Affichage de tout les produits
const allProducts = async (req, res) => {
  try {
    const response = await Products.getAllProduct();

    res
    .status(200)
    .json({
      msg: "Tout les produits on été récupéré avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Affichage d'un produit
const productsById = async (req, res) => {
  try {
    const response = await Products.getProductsById(req.params.id);

    if (!response) {
      return res.status(404).json({ msg: "Produit non trouvé" });
    }
    res.status(200).json ({ msg: "Produits récupéré avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Récupération des produit par categorie
const productsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const response = await Products.getProductsByCategoryId(categoryId);

    if (!response.length) {
      return res.status(404).json({ msg: "Aucun produit trouvé pour cette catégorie" });
    }
    res.status(200).json({ msg: "Produits récupérés avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Ajout d'un produit
const addProducts = async (req, res) => {
  try {
    const {
      title,
      undertitle,
      description,
      alt,
      price,
      ref,
      quantityInStock,
      categories_id
    } = req.body;

    const picture = req.file ? req.file.filename : null;

    if (!picture) {
      return res.status(400).json({ msg: "Aucune image téléchargée" });
    }

    const productData = [
      title,
      undertitle,
      description,
      picture,
      alt,
      price,
      ref,
      quantityInStock,
      categories_id
    ];

    const response = await Products.postAddProducts(productData);

    if (response.error) {
      return res.status(500).json({
        msg: "Erreur lors de l'ajout du produit",
        error: response.error
      });
    }

    res.status(201).json({ msg: "Produit ajouté avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

// Modification d'un produit
const editProducts = async (req, res) => {
  try {
    const {
      title,
      undertitle,
      description,
      alt,
      price,
      ref,
      quantityInStock,
      categories_id
    } = req.body;

    const picture = req.file ? req.file.path : null;

    const productData = [
      title, undertitle, description, picture, alt, price,
      ref, quantityInStock, categories_id, req.params.id
    ];

    const response = await Products.patchEditProducts(productData);

    if (response.error) {
      return res
        .status(500)
        .json({
          msg: "Erreur lors de la mise à jour du produit",
          error: response.error.message
        });
    }

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Produits non trouvé" });
    }
    res.status(200).json({ msg: "Produit modifier avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Suppression d'un produit
const deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Products.deleteProductsById(id);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Produit non trouvé" });
    }
    res.status(200).json({ msg: "Produit supprimé avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

export { allProducts, productsById, productsByCategory, addProducts, editProducts, deleteProducts };
