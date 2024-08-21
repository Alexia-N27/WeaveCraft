import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  useSession from "../../../hooks/useSession";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

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

  // Modification d'un utilisateur


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
        <div className="profile-address-edit">
          <h2>Profil</h2>
          <button className="btn-edit">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <p><strong>Prénom:</strong> {user.firstname}</p>
        <p><strong>Nom:</strong> {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mot de passe: </strong>***************</p>
      </div>
      <div className="details-user-address">
        <div className="profile-address-edit">
          <h2>Adresse</h2>
          <button className="btn-edit">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
          <p><strong>Type:</strong> {user.address_type}</p>
          <p><strong>Rue:</strong> {user.street}</p>
          <p><strong>Complément:</strong> {user.complement}</p>
          <p><strong>Code Postal:</strong> {user.zip_code}</p>
          <p><strong>Ville:</strong> {user.city}</p>
          <p><strong>Pays:</strong> {user.country}</p>
      </div>
    </section>
    <Link to={"/"}>Retour à la boutique</Link>

    </main>
  );
}

export default UserProfile;
