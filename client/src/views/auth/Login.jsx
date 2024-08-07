import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useSession from "../../hooks/useSession";

function Login() {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  const [MessageSuccess, setMessageSuccess] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { session, setSession } = useSession();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    console.log(formData);

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
        setMessageSuccess("Connexion réussie !");
        setError(null);
        if (data.user.roles_id == 1) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError("Erreur lors de la connexion");
        throw new Error("Erreur lors de la connexion");
      }
    } catch (error) {
      console.log("Erreur de réseau", error);
      setError(`Erreur de réseau: ${error.message}`);
    }
  };


  return (
    <main>
      <h1>Bienvenue sur la page de connexion</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email
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
        </label>

        <label htmlFor="password">Mot de passe
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
        </label>

        <button type="submit">
          Se connecter
        </button>
      </form>
      {error && <p>{error}</p>}
      {MessageSuccess && <p>{MessageSuccess}</p>}
      {session?.user.firstname && <p>Bienvenue, {session?.user.firstname}!</p>}
    </main>
  )
}

export default Login;
