import Contacts from "../models/Contacts.js";

// Affichage de tous les messages
const allMessages = async (req, res) => {
  try {
    const response = await Contacts.getAllMessages();
    res.json({
      msg: "Tout les messages on été récupéré avec succès.",
      response
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Affichage d'un message
const messageById = async (req, res) => {
  try {
    const response = await Contacts.getMessageById(req.params.id);
    if (!response) {
      return res.json({ msg: "Message non trouvé" });
    }
    res.json({ msg: "Message récupéré avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de server", error });
  }
};

// Ajout d'un message
const addMessage = async (req, res) => {
  try {
    const response = await Contacts.postAddMessage(req.body);
    res.status(201).json({ msg: "Message envoyé avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Modification d'un message
const editMessage = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await Contacts.patchEditMessage(id, req.body);
    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Message non trouvé" });
    }
    res.json({ msg: "Message modifié avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

// Suppression d'un message
const deleteMessage = async (req, res) => {
  try {
    const response = await Contacts.deleteMessageById(req.params.id);
    if (response.affectedRows === 0) {
      return res.json({ msg: "Message non trouvé" });
    }
    res.json({ msg: "Message supprimé avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error });
  }
};

export { allMessages, messageById, addMessage, editMessage, deleteMessage };
