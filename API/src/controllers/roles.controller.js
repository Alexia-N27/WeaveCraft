import Roles from "../models/Roles.js";

// Affichage de tout les rôles
const allRoles = async (req, res) => {
  try {
    const response = await Roles.getAllRoles();
    res
    .status(200)
    .json({
      msg: "Tout les rôles ont été récupérés avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Affichage d'un rôle
const rolesById = async (req, res) => {
  try {
    const response = await Roles.getRolesById(req.params.id);
    if (!response) {
      return res.status(404).json({ msg: "Role non trouvée" });
    }
    res.status(200).json({ msg: "Role récupéré avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Ajout d'un rôle
const addRoles = async (req, res) => {
  try {
    const { label } = req.body;

    if (!label) {
      return res.status(404).json({ msg: "Le champ 'label' est requis" });
    }

    const response = await Roles.postAddRoles(label);

    res.status(201).json({ msg: "Role ajouté avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Modification d'un rôle
const editRoles = async (req, res) => {
  try {
    const { label } = req.body;
    const roleData = [label, req.params.id];

    const response = await Roles.patchEditRoles(roleData);

    if (response.error) {
      return res
        .status(500)
        .json({
          msg: "Erreur lors de la mise à jour du rôle",
          error: response.error.message
        });
    }

    if(response.affectedRows === 0) {
      return res.status(404).json({ msg: "Role non trouvé" });
    }
    res.status(200).json({ msg: "Role modifier avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Suppression d'un rôle
const deleteRoles = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Roles.deleteRolesById(id);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Role non trouvé"});
    }
    res.status(200).json({ msg: "Role supprimer avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};


export { allRoles, rolesById, addRoles, editRoles, deleteRoles };
