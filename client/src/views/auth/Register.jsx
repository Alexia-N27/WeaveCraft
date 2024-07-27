import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useSession from "../../hooks/useSession";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [messageValidateRegister, setMessageValidateRegister] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setSession } = useSession();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

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
        console.log(data);
        setSession(data);
        setError(null);
        setMessageValidateRegister("Inscription et connexion réussie");
        navigate("/");

      } else {
        throw new Error("Problème lors de la connexion");
      }
    } catch (error) {
      console.log("Erreur de réseau", error);
      setError(`Erreur de réseau: ${error.message}`);
    }
  };

  return (
    <main>
      <h1>Bienvenue sur la page d&apos;inscription</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname"> Prénom
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Entrer votre prénom"
            aria-label="Entrer votre prénom"
            value={formData.firstname}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="lastname"> Nom
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Entrer votre nom"
            aria-label="Entrer votre nom"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="email"> Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email@gmail.com"
            aria-label="Ajoutez un email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="password"> Mot de passe
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Entrer votre mot de passe"
            aria-label="Entrer votre mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Valider</button>
      </form>
      {error && <p>{error}</p>}
      {messageValidateRegister && <p>{messageValidateRegister}</p>}
    </main>
  );
}

export default Register;
