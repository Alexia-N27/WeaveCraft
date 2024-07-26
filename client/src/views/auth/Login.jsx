import { useState } from "react";
import useUser from "../../hooks/UseUser";

function Login() {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });
  const [MessageSuccess, setMessageSuccess] = useState("");
  const [error, setError] = useState(null);

  const { user, isLoading, setUser } = useUser();

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
            "content-Type" : "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setMessageSuccess("Connexion réussie !");
        setError(null);

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);

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

        <button type="submit" disabled={isLoading}>
          {isLoading? "Chargement..." : "Se connecter"}
        </button>
      </form>
      {error && <p>{error}</p>}
      {MessageSuccess && <p>{MessageSuccess}</p>}
      {user && <p>Bienvenue, {user.firstname}!</p>}
    </main>
  )
}

export default Login;
