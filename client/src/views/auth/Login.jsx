import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:9000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Connexion réussie:", data);
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erreur de connexion");
      }
    } catch (error) {
      setError("Erreur de connexion");
    }
  }

  return(
    <main>
    <h1>Bienvenue sur la page de connexion</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="Entrer votre email"
        aria-label="Entrer votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Mot de passe</label>
      <input
        type="password"
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
