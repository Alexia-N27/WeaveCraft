import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./contact.scss";

function Contact() {
  document.title = "Back Office | Contact";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    content: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setError(null);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Erreur lors de l'envoi du message");
        setSuccess(false);
      }
    } catch (error) {
      setError("Erreur de réseau");
      setSuccess(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
  <main id="form-contact">
    <h1>Contactez-nous</h1>

    {/* Affichage de l'erreur */}
    {error && <div className="error-message">{error}</div>}

    {/* Affichage du message succès */}
    {success && (
      <div className="success-message">
        Votre message a été envoyé avec succès!
      </div>
    )}

    <form className="message-form" onSubmit={handleSubmit}>
      <div className="name-user-form">
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Votre prénom"
          aria-label="Votre prénom"
          value={formData.firstname}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastname">Nom</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Votre nom"
          aria-label="Votre nom"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
      </div>

      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Votre email"
        aria-label="Votre email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="subject">Sujet</label>
      <input
        type="text"
        id="subject"
        name="subject"
        placeholder="Votre sujet"
        aria-label="Votre sujet"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      <label htmlFor="content">Message</label>
      <textarea
        type="text"
        id="content"
        name="content"
        placeholder="Votre message"
        aria-label="Votre message"
        value={formData.content}
        onChange={handleChange}
        required
      />

      <button type="Submit">Envoyer</button>
    </form>
    </main>
  );
}

export default Contact;
