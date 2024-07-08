import Contacts from "../models/Contacts.js";

// Affichage de tous les messages
const allMessages = async (req, res) => {
  try {
    const response = await Contacts.getAllMessages();
    res.status(200)
    .json({
      msg: "Tout les messages on été récupéré avec succès.",
      response
    });

  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Affichage d'un message
const messageById = async (req, res) => {
  try {
    const response = await Contacts.getMessageById(req.params.id);

    if (!response) {
      return res.status(404).json({ msg: "Message non trouvé" });
    }
    res.status(200).json({ msg: "Message récupéré avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur server", error: error.message });
  }
};

// Ajout d'un message
const addMessage = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      subject,
      content
    } = req.body;

    const contactData = [firstname, lastname, email, subject, content];

    const response = await Contacts.postAddMessage(contactData);

    if (response.error) {
      return res.status(500).json({
        msg: "Erreur lors de l'envoie du message",
        error: response.error
      });
    }

    res.status(201).json({ msg: "Message envoyé avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
};

// Modification d'un message
const editMessage = async (req, res) => {
  try {
    const { readMessage } = req.body;

    const contactData = [readMessage, req.params.id];

    const response = await Contacts.patchEditMessage(contactData);

    if (response.error) {
      return res
        .status(500)
        .json({
          msg: "Erreur lors de la mise à jour du message",
          error: response.error.message
        });
    }

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Message non trouvé" });
    }
    res.status(200).json({ msg: "Message modifié avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

// Suppression d'un message
const deleteMessage = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Contacts.deleteMessageById(id);

    if (response.affectedRows === 0) {
      return res.status(404).json({ msg: "Message non trouvé" });
    }
    res.status(200).json({ msg: "Message supprimé avec succès", response });
  } catch (error) {
    res.status(500).json({ msg: "Erreur de serveur", error: error.message });
  }
};

export { allMessages, messageById, addMessage, editMessage, deleteMessage };
