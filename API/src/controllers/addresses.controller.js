import Addresses from "../models/Addresses.js";
import Query from "../models/Query.js";

const getAllAddresses = async (req, res) => {
  try {
    const response = await Addresses.getAllAddresses();
    res.json({
      msg: "Je suis sur la route API pour récupérer toutes les adresses",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Ajout d'une adresse
const addAddresses = async (req, res) => {
  console.log("ADD ADDRESS", req.body);
  try {
    const response = await Addresses.postAddAddresses(req.body);
    res.json({ msg: "Les données ont bien été insérées", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Modification d'adresse
const editAddresses = async (req, res) => {
  try {

    const response = await Addresses.patchEditAddresses(req.params.id, req.body);
    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Adresse non trouvé" });
    }
    res.json({ msg: "Adresse modifié avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Suppression d'adresse
const deleteAddresses = async (req, res) => {
  try {
    const response = await Addresses.deleteAddressesById(req.params.id);
    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Adresse non trouvée" });
    }
    res.json({ msg: "Adresses supprimé avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};


export { getAllAddresses, addAddresses, editAddresses, deleteAddresses };
