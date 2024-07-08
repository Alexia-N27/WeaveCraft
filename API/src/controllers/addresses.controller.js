import Addresses from "../models/Addresses.js";

// Affichage de toutes les adresses
const AllAddresses = async (req, res) => {
  try {
    const response = await Addresses.getAllAddresses();
    res.status(200)
    .json({
      msg: "Toutes les adresses ont été récupérées avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Affichage d'une adresse
const AddressesById = async (req, res) => {
  try {
    const response = await Addresses.getAddressesById(req.params.id);

    if (!response) {
      return res.status(404).json({ msg: "Adresse non trouvée"});
    }
    res.status(200).json({ msg: "Adresse récupérée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

// Ajout d'une adresse
const addAddresses = async (req, res) => {
  try {
    const {
      address_type,
      street,
      complement,
      city,
      zip_code,
      country,
      users_id
    } = req.body;

    const addressData = [address_type, street, complement, city, zip_code, country, users_id];

    const response = await Addresses.postAddAddresses(addressData);

    if (response.error) {
      return res.status(500).json({
        msg: "Erreur lors de l'ajout de l'adresse",
        error: response.error
      });
    }

    res.status(201).json({ msg: "Adresse ajoutée avec succcès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Modification d'adresse
const editAddresses = async (req, res) => {
  try {
    const {
      address_type,
      street,
      complement,
      city,
      zip_code,
      country,
      users_id
    } = req.body;

    const addressData = [address_type, street, complement, city, zip_code, country, users_id, req.params.id];

    const response = await Addresses.patchEditAddresses(addressData);

    if (response.error) {
      return res
        .status(500)
        .json({
          msg: "Erreur lors de la mise à jour du rôle",
          error: response.error.message
        });
    }

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Adresse non trouvé" });
    }
    res.status(200).json({ msg: "Adresse modifiée avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

// Suppression d'adresse
const deleteAddresses = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Addresses.deleteAddressesById(id);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Adresse non trouvée" });
    }
    res.status(200).json({ msg: "Adresse supprimé avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};


export { AllAddresses, AddressesById, addAddresses, editAddresses, deleteAddresses };
