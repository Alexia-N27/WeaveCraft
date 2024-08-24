import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useSession from "../../../hooks/useSession";

import "./register.scss";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { setSession } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if(response.ok) {
        const data = await response.json();
        setSession(data);
        setSuccess(true);
        setError(null);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Erreur lors de l'inscription")
      }
    } catch (error) {
      setSuccess(false);
      setError("Erreur de réseau");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <main id="register-page">
      <h1>Crée ton compte</h1>

      {/* Affichage de l'erreur */}
      {error && <div className="error-message">{error}</div>}

      {/* Affichage du message succès */}
      {success && (
        <div className="success-message">
          Vous êtes maintenant inscrit !
        </div>
      )}

      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="firstname">Prénom</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Entrer votre prénom"
            aria-label="Entrer votre prénom"
            value={formData.firstname}
            onChange={handleChange}
            required
          />

        <label htmlFor="lastname">Nom</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Entrer votre nom"
            aria-label="Entrer votre nom"
            value={formData.lastname}
            onChange={handleChange}
            required
          />

        <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@gmail.com"
            aria-label="Ajoutez un email"
            value={formData.email}
            onChange={handleChange}
            required
          />

        <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="Current-password"
            placeholder="Entrer votre mot de passe"
            aria-label="Entrer votre mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />

        <button type="submit">Je crée mon compte</button>
      </form>
    </main>
  );
}

export default Register;
