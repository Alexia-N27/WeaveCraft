import Orders from "../models/Orders.js";

// Affichage de toutes les commandes
const allOrders = async (req, res) => {
  try {
    const response = await Orders.getAllOrders();

    res.status(200)
    .json({
      msg: "Toutes les commandes on été récupérées avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Affichage d'une commande
const ordersById = async (req, res) => {
  try {
    const response = await Orders.getOrdersById(req.params.id);

    if (!response) {
      return res.status(404).json({ msg: "Commande non trouvée" });
    }
    res.status(200).json({ msg: "Commande récupérée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Affichage d'es commande utilisateur
const ordersByUser = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const response = await Orders.getOrdersByUserId(userId);

    if (response.error) {
      return res.status(500).json({
        msg: "Erreur lors de la récupération des commandes",
        error: response.error
      });
    }

    if (response.length === 0) {
      return res.status(404).json({ msg: "Aucune commande trouvée" });
    }
    res.status(200).json({ msg: "Commandes récupérées avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
}

// Ajout d'une commande
const addOrders = async (req, res) => {
  try {
    const { ref, productsQuantity, totalPrice, users_id } = req.body;

    const orderData = [ref, productsQuantity, totalPrice, users_id];

    const response = await Orders.postAddOrders(orderData);

    if (response.error) {
      return res.status(500).json({
        msg: "Erreur lors de l'ajout de la commande",
        error: response.error
      });
    }

    res.status(201).json({ msg: "Commande ajoutée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Modification d'une commande
const editOrders = async (req, res) => {
  try {
    const { ref, productsQuantity, totalPrice, users_id } = req.body;

    const orderData = [ref, productsQuantity, totalPrice, users_id, req.params.id];

    const response = await Orders.patchEditOrders(orderData);

    if (response.error) {
      return res
        .status(500)
        .json({
          msg: "Erreur lors de la mise à jour de la commande",
          error: response.error.message
        });
    }

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Commande non trouvé" });
    }
    res.status(200).json({ msg: "Commande modifiée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Suppression d'une commande
const deleteOrders = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Orders.deleteOrdersById(id);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Commande non trouvée" });
    }
    res.status(200).json({ msg: "Commande supprimée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};



export { allOrders, ordersById, ordersByUser, addOrders, editOrders, deleteOrders };
