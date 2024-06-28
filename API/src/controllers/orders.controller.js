import Orders from "../models/Orders.js";

// Affichage de toutes les commandes
const allOrders = async (req, res) => {
  try {
    const response = await Orders.getAllOrders();
    res.json({
      msg: "Toutes les commandes on été récupérées avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Affichage d'une commande
const ordersById = async (req, res) => {
  try {
    const response = await Orders.getOrdersById(req.params.id);
    if (!response) {
      return res.json({ msg: "Commande non trouvée" });
    }
    res.json({ msg: "Commande récupérée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Ajout d'une commande
const addOrders = async (req, res) => {
  try {
    const response = await Orders.postAddOrders(req.body);
    res.status(201).json({ msg: "Commande ajoutée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Modification d'une commande
const editOrders = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await Orders.patchEditOrders(id, req.body);
    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Commande non trouvé" });
    }
    res.json({ msg: "Commande modifiée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Suppression d'une commande
const deleteOrders = async (req, res) => {
  try {
    const response = await Orders.deleteOrdersById(req.params.id);
    if (response.affectedRows === 0) {
      return res.json({ msg: "Commande non trouvée" });
    }
    res.json({ msg: "Commande supprimée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};



export { allOrders, ordersById, addOrders, editOrders, deleteOrders };
