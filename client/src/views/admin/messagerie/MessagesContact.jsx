import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEnvelope, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

import "./messageContact.scss";

function MessageContact() {
  const [messages, setMessages] = useState(null);
  const [shouldRefreshMessages, setShouldRefreshMessages] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    document.tittle = "Back Office | Messagerie";
    async function fetchMessages() {
      const response = await fetch(
        "http://localhost:9000/api/v1/contacts",
        {
          method: "GET",
          headers: {
            "Content-Type" : "application/json",
          },
          credentials: "include",
        }
      );

      if (!response) {
        console.log("Aucun messages trouvé");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setMessages(data.response);
      }
    }
    fetchMessages();
  }, [shouldRefreshMessages]);

  // Suppression de message
  async function handleDelete(e, id) {
    e.preventDefault();
    e.stopPropagation();
    try{
      const response = await fetch(
        `http://localhost:9000/api/v1/contacts/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setShouldRefreshMessages(prev => !prev);
      } else {
        console.log("Erreur lors de la suppression du message");
      }
    } catch (error) {
      console.log("Erreur", error);
    }
  }

  // Marqué comme lu/nonlu
  async function handleMarkAsRead(e, id, status) {
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/contacts/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ readMessage: status === 0 ? 1 : 0 }),
        }
      );

      if (response.ok) {
        setShouldRefreshMessages(prev => !prev);
      } else {
        console.log("Erreur lors de la mise à jour du statut du message")
      }
    } catch (error) {
      console.log("Erreur", error);
    }
  }

  // Click d'un message
  function handleRowClick(message) {
    setSelectedMessage(message);
  }

  if (!messages) {
    return (
      <main>
        <p>Chargement...</p>
      </main>
    );
  }

  if (messages.length === 0) {
    return (
      <main>
        <p>Pas de messages trouvés</p>
      </main>
    );
  }

  return (
    <main id="message-contact">
      <h1>Gestion des messages</h1>
      <section>
        <table>
          <thead>
            <tr>
              <th>De</th>
              <th>Date</th>
              <th>Sujet</th>
              <th>lu/nonlu</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => {
              return (
                <tr key={message.id} onClick={() => handleRowClick(message)}>
                  <td>{message.lastname} {message.firstname}</td>
                  <td>
                    {new Date(message.created_at).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>{message.subject}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={message.readMessage === 0 ? faEnvelope : faEnvelopeOpen}
                      onClick={(e) => handleMarkAsRead(e, message.id, message.readMessage)}
                    />
                  </td>
                  <td>
                    <button onClick={(e) => handleDelete(e, message.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {selectedMessage && (
          <div className="message-details">
            <h2>Détails du message</h2>
            <p><strong>De :</strong> {selectedMessage.firstname} {selectedMessage.lastname}</p>
            <p><strong>Email :</strong> {selectedMessage.email}</p>
            <p><strong>Date : </strong>
              {new Date(selectedMessage.created_at).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p><strong>Sujet :</strong> {selectedMessage.subject}</p>
            <p><strong>Message :</strong> {selectedMessage.content}</p>
          </div>
        )}

        <Link to={"/admin/dashboard"}>Retour au tableau de bord</Link>
      </section>
    </main>
  )
}

export default MessageContact;
