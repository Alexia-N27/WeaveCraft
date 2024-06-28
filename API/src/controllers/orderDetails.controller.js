import OrderDetails from "../models/OrderDetails.js";

// Affichage de toutes les commandes détaillées
const allOrderDetails = async (req, res) => {
  try {
    const response = await OrderDetails.getAllOrderDetails();
    res.json({
      msg: "Toutes les commandes détaillées on été récupérées avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Affichage d'une commande détaillée
const allOrderDetailsById = async (req, res) => {
  try {
    const response = await OrderDetails.getAllOrderDetailsById(req.params.id);
    if (!response) {
      return res.json({ msg: "Commande détaillée non trouvée" });
    }
    res.json({ msg: "Commande détaillée récupérée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Ajout d'une commande détaillée
const addOrderDetails = async (req, res) => {
  try {
    const response = await OrderDetails.postAddOrderDetails(req.body);
    res.status(201).json({ msg: "Commande détaillée ajoutée avec succès", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Modification d'une commande détaillée
const editOrderDetails = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await OrderDetails.patchEditOrderDetails(id, req.body);
    if(response.affectedRows === 0) {
      return res.status(404).json({ msg: "Commande détaillée non trouvée" });
    }
    res.json({ msg: "Commande détaillée modifiée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Suppression d'une commande détaillée
const deleteOrderDetails = async (req, res) => {
  try {
    const response = await OrderDetails.deleteOrderDetailsById(req.params.id);
    if (response.affectedRows === 0) {
      return res.json({ msg: "Comande détaillée non trouvée" });
    }
    res.json({ msg: "Commande détaillée supprimée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};


export { allOrderDetails, allOrderDetailsById, addOrderDetails, editOrderDetails, deleteOrderDetails };
