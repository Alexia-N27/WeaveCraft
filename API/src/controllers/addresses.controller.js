import Addresses from "../models/Addresses.js";

// Affichage de toutes les adresses
const AllAddresses = async (req, res) => {
  try {
    const response = await Addresses.getAllAddresses();
    res.json({
      msg: "Toutes les adresses ont été récupérées avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Affichage d'une adresse
const AddressesById = async (req, res) => {
  try {
    const response = await Addresses.getAddressesById(req.params.id);
    if (!response) {
      return res.status(404).json({ msg: "Adresse non trouvée"});
    }
    res.json({ msg: "Adresse récupérée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error});
  }
};

// Ajout d'une adresse
const addAddresses = async (req, res) => {
  try {
    const response = await Addresses.postAddAddresses(req.body);
    res.status(201).json({ msg: "Adresse ajoutée avec succcès", response });
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
    res.json({ msg: "Adresse modifiée avec succès", response });
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


export { AllAddresses, AddressesById, addAddresses, editAddresses, deleteAddresses };
