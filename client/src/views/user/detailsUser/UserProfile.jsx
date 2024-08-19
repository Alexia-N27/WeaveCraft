import { useEffect, useState } from "react";
import  useSession from "../../../hooks/useSession";

import "./userProfile.scss";

function UserProfile() {
  document.title = "Profil utilisateur";
  const { session, isLoading } = useSession();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) return;

    async function fetchUser() {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/auth/profil/`,
          {
            method: "GET",
            headers: {
              "Accept" : "application/json",
            },
            credentials: "include",
          }
        );

        console.log(response);

        if (!response.ok) {
          setError("Aucun utilisateur trouvé");
          return;
        }

        const data = await response.json();
        setUser(data.response);
        console.log("RESPONSE: ", data.response);
        setError(null);
      } catch (error) {
        setError("Erreur de réseau");
      }
    }
    fetchUser();
  }, [session]);

  if (isLoading) {
    return (
      <main>
        <p>Chargement...</p>
      </main>
    );
  }

  if (!session) {
    return(
      <main>
        <p>Non autorisé</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <p>Utilisateur introuvable</p>
      </main>
    );
  }

  return (
    <main id="profile-user">
      <h1>Mon profil</h1>

    {/* Affichage de l'erreur */}
    {error && <div className="error-message">{error}</div>}

    <section className="details-user">
      <div  className="details-user-profile">
        <h2>Profil</h2>
        <p><strong>Prénom:</strong> {user.firstname}</p>
        <p><strong>Nom:</strong> {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </section>

    </main>
  );
}

export default UserProfile;
