import Query from "../model/Query.js";

// Affichage de tout les rôles
const getAll = async (req, res) => {
  try {
    const query = `SELECT * FROM roles`;
    const response = await Query.run(query);
    res.json({ msg: "Je suis sur la route API pour récupérer tout les rôles", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Ajout d'un rôle
const addRole = async (req, res) => {
  const { role_label } = req.body;

  try {
    const query = `INSERT INTO roles (role_label) VALUES (?)`;
    const response = await Query.runWithParams(query, [role_label]);

    res.json({ msg: "Les données ont bien été inséré", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error });
  }
};

// Modification d'un rôle
const editRole = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `UPDATE roles SET role_label = ? WHERE id = ?`;
    const data = {...req.body, id};
    const response = await Query.runWithParams(query, data);

    if(response.affectedRows === 0) {
      return res.status(404).json({ msg: "Role non trouvé" });
    }
    res.json({ msg: "Role modifier avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error });
  }
};

// Suppression d'un rôle
const deleteRole = async (req, res) => {
  console.log("DELETE ROLE", req.params);
  try {
    const { id } = req.params;
    const query = `DELETE FROM roles WHERE id = ?`;
    const response = await Query.runWithParams(query, [parseInt(id, 10)]);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Role non trouvé"});
    }
    res.json({ msg: "Role supprimer avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error });
  }
};



export { getAll, addRole, editRole, deleteRole };
