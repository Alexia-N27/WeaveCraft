import Roles from "../models/Roles.js";

// Affichage de tout les rôles
const allRoles = async (req, res) => {
  try {
    const response = await Roles.getAllRoles();
    res.json({
      msg: "Tout les rôles ont été récupérés avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Affichage d'un rôle
const rolesById = async (req, res) => {
  try {
    const response = await Roles.getRolesById(req.params.id);
    if (!response) {
      return res.status(404).json({ msg: "Role non trouvée" });
    }
    res.json({ msg: "Role récupéré avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Ajout d'un rôle
const addRoles = async (req, res) => {
  try {
    const response = await Roles.postAddRoles(req.body);
    res.status(201).json({ msg: "Role ajouté avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error });
  }
};

// Modification d'un rôle
const editRoles = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Roles.patchEditRoles(id, req.body);
    if(response.affectedRows === 0) {
      return res.status(404).json({ msg: "Role non trouvé" });
    }
    res.json({ msg: "Role modifier avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error });
  }
};

// Suppression d'un rôle
const deleteRoles = async (req, res) => {
  try {
    const response = await Roles.deleteRolesById(req.params.id);
    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Role non trouvé"});
    }
    res.json({ msg: "Role supprimer avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error });
  }
};


export { allRoles, rolesById, addRoles, editRoles, deleteRoles };
