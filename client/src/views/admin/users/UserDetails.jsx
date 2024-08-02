import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useSession from "../../../hooks/useSession";

import "./userDetails.scss";

function UserDetails() {
  document.title = "Back office || Détails de l&apos;utilisateur";
  const { userId} = useParams();
  const navigate = useNavigate();
  const { session, isLoading } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!session) return;

    async function fetchUser() {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/auth/admin/${userId}`,
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
          console.log("Erreur lors de la récupération de l'utilisateur");
          return;
        }

        const data = await response.json();
        setUser(data.response[0]);
        console.log(data.response);
      } catch (error) {
        console.log("Erreur:", error);
      }
    }
    fetchUser();
  }, [session, userId]);

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
    <main>
      <header>
        <h1>Détail de l&apos;utilisateur</h1>
      </header>
      <section>
        <p><strong>Prénom:</strong> {user.firstname}</p>
        <p><strong>Nom:</strong> {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rôle:</strong> {user.roles_label}</p>
        {user.address_id ? (
          <>
            <h2>Adresse</h2>
            <p><strong>Type:</strong> {user.address_type}</p>
            <p><strong>Rue:</strong> {user.street}</p>
            <p><strong>Complément:</strong> {user.complement}</p>
            <p><strong>Code Postal:</strong> {user.zip_code}</p>
            <p><strong>Ville:</strong> {user.city}</p>
            <p><strong>Pays:</strong> {user.country}</p>
          </>
        ) : (
          <>
            <h2>Adresse</h2>
            <p>Aucune adresse renseignée</p>
          </>
        )}
        <button onClick={() => navigate(`/admin/edituser/${userId}`)}>Modifier</button>
        <Link to={"/admin/users"}>Retour aux utilisateurs</Link>
      </section>
    </main>
  );
}

export default UserDetails;
