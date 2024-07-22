import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/UseUser";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Response data:", data);
      if (response.ok) {
        console.log("Connexion réussie:", data);
        setUser(data.user);
        if (data.user.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError("Erreur de connexion");
    }
  }

  return(
    <main>
    <h1>Bienvenue sur la page de connexion</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Entrer votre email"
        aria-label="Entrer votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Entrer votre mot de passe"
        aria-label="Entrer votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Se connecter</button>
    </form>
    </main>
  );
}

export default Login;
