import OrderDetails from "../models/OrderDetails.js";

// Affichage de toutes les commandes détaillées
const allOrdersDetails = async (req, res) => {
  try {
    const response = await OrderDetails.getAllOrderDetails();

    res
    .status(200)
    .json({
      msg: "Toutes les commandes détaillées on été récupérées avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Affichage d'une commande détaillée
const orderDetailsById = async (req, res) => {
  try {
    const response = await OrderDetails.getAllOrderDetailsById(req.params.id);

    if (!response) {
      return res.status(404).json({ msg: "Commande détaillée non trouvée" });
    }
    res
    .status(200)
    .json({
      msg: "Commande détaillée récupérée avec succès",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Ajout d'une commande détaillée
const addOrderDetails = async (req, res) => {
  try {
    const { orders_id, products_id, quantity, price } = req.body;

    const detailsData = [orders_id, products_id, quantity, price];

    const response = await OrderDetails.postAddOrderDetails(detailsData);

    if (response.error) {
      return res.status(500).json({
        msg: "Erreur lors de l'ajout de la commande détaillée",
        error: response.error
      });
    }

    res.status(201).json({ msg: "Commande détaillée ajoutée avec succès", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Modification d'une commande détaillée
const editOrderDetails = async (req, res) => {
  try {
    const { orders_id, products_id, quantity, price } = req.body;

    const detailsData = [orders_id, products_id, quantity, price, req.params.id];

    const response = await OrderDetails.patchEditOrderDetails(detailsData);

    if (response.error) {
      return res
        .status(500)
        .json({
          msg: "Erreur lors de la mise à jour de la commande détaillée",
          error: response.error.message
        });
    }

    if(response.affectedRows === 0) {
      return res.status(404).json({ msg: "Commande détaillée non trouvée" });
    }
    res.status(200).json({ msg: "Commande détaillée modifiée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Suppression d'une commande détaillée
const deleteOrderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await OrderDetails.deleteOrderDetailsById(id);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Comande détaillée non trouvée" });
    }
    res.status(200).json({ msg: "Commande détaillée supprimée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};


export { allOrdersDetails, orderDetailsById, addOrderDetails, editOrderDetails, deleteOrderDetails };
