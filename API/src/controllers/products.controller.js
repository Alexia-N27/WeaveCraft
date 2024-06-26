import Products from "../models/Products.js";

// Affichage de tout les produits
const allProducts = async (req, res) => {
  try {
    const response = await Products.getAllProduct();
    res.json({
      msg: "Tout les produits on été récupéré avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Affichage d'un produit
const productsById = async (req, res) => {
  try {
    const response = await Products.getProductsById(req.params.id);
    if (!response) {
      return res.json({ msg: "Produit non trouvé" });
    }
    res.json ({ msg: "Produits récupéré avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur" });
  }
};

// Ajout d'un produit
const addProducts = async (req, res) => {
  try {
    const response = await Products.postAddProducts(req.body);
    res.status(201).json({ msg: "Produit ajouté avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Modification d'un produit
const editProducts = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await Products.patchEditProducts(id, req.body);
    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Produits non trouvé" });
    }
    res.json({ msg: "Produit modifier avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Suppression d'un produit
const deleteProducts = async (req, res) => {
  try {
    const response = Products.deleteProductsById(req.params.id);
    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Produit non trouvé" });
    }
    res.json({ msg: "Produit supprimé avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

export { allProducts, productsById, addProducts, editProducts, deleteProducts };
