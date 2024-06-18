import Query from "../model/Query.js";

const getAllAddress = async (req, res) => {
  try {
    const query = `SELECT * FROM addresses`;
    const [response] = await Query.run(query);
    res.json({
      msg: "Je suis sur la route API pour récupérer toutes les adresses",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Ajout d'une adresse
const addAddress = async (req, res) => {
  console.log("ADD ADDRESS", req.body);
  try {
    const query = `
    INSERT INTO addresses (street, city, zip_code, country, address_type, complement, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const response = await Query.runWithParams(query, req.body);
    res.json({ msg: "Les données ont bien été insérées", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Modification d'adresse
const editAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
    UPDATE addresses SET street = ?, city = ?, zip_code = ?, country = ?, address_type = ?, complement = ?, user_id = ? WHERE id = ? `;
    const data = {...req.body, id};
    const response = await Query.runWithParams(query, data);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Adresse non trouvé" });
    }
    res.json({ msg: "Adresse modifié avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Suppression d'adresse
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM addresses WHERE id = ?`;
    const response = await Query.runWithParams(query, id);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Adresse non trouvée" });
    }
    res.json({ msg: "Adresses supprimé avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};


export { getAllAddress, addAddress, editAddress, deleteAddress };
