import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import useSession from "../../../hooks/useSession";
import "./login.scss";

function Login() {
  const navigate = useNavigate();

  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { session, setSession } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault(e);

    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSession(data);
        setSuccess(true);
        setError(null);

        if (data.user.roles_id == 1) {
          navigate("/admin/dashboard");
        } else {
          setTimeout(() => {
            navigate("/");
          }, 750);
        }
      } else {
        setError("Erreur lors de la connexion");
      }
    } catch (error) {
      setSuccess(false);
      setError("Erreur de réseau");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <main id="login-page">
      <h1>Me connecter</h1>

      {/* Affichage de l'erreur */}
      {error && <div className="error-message">{error}</div>}

      {/* Affichage du message succès */}

      {session?.user.firstname ? (
        <div className="success-message">
          Bienvenue, {session.user.firstname} !
        </div>
      ) : (
        success && (
          <div className="success-message">
            Vous êtes bien connecté !
          </div>
        )
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Entrer votre email"
            aria-label="Entrer votre email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

        <label htmlFor="password">Mot de passe*</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Entrer votre mot de passe"
            aria-label="Entrer votre mot de passe"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

        <button type="submit">Je me connecte</button>
        <Link className="link-register" to={"/register"}>Je crée mon compte</Link>
      </form>
      <p>*Champ obligatoire</p>
    </main>
  );
}

export default Login;
