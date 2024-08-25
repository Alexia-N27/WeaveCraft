import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useSession from "../../../hooks/useSession";

import "./userDetails.scss";

function UserDetails() {
  document.title = "Back office || Détails de l&apos;utilisateur";
  const { userId } = useParams();
  const { session, isLoading } = useSession();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

        if (!response.ok) {
          setError("Aucun utilisateur trouvé");
          setSuccess(false);
          return;
        }

        const data = await response.json();
        setUser(data.response[0]);
        setError(null);
        setSuccess(false);
      } catch (error) {
        setError("Erreur de réseau");
        setSuccess(false);
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
    <main id="admin-details-user">

      {/* Affichage de l'erreur */}
      {error && <div className="error-message">{error}</div>}

      {/* Affichage du message de succès */}
      { success && (
        <div className="success-message">
          Bienvenue sur le détails de l&apos;utilisateur !
        </div>
      )}

      <section className="user-details">
        <div  className="user-details-profil">
          <h2>Profil</h2>
          <p><strong>Prénom:</strong> {user.firstname}</p>
          <p><strong>Nom:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rôle:</strong> {user.roles_label}</p>
        </div>

        <div className="user-details-address">
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
        </div>

        <Link to={"/admin/users"}>Retour aux utilisateurs</Link>
      </section>
    </main>
  );
}

export default UserDetails;
