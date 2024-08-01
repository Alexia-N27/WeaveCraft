import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useSession from "../../../hooks/useSession";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./adminUsers.scss";

function AdminUsers() {
  document.title = "Back office || Gestion des utilisateurs";
  const navigate = useNavigate();
  const { session, isLoading } = useSession();
  const [users, setUsers] = useState([]);
  const [shouldRefreshUsers, setShouldRefreshUsers] = useState(false);

  useEffect(() => {
    if (!session) return;

    async function fetchUsers() {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/auth/users",
          {
            method: "GET",
            headers: {
              "Accept" : "application/json"
            },
            credentials: "include",
          }
        );

        console.log(response);

        if (!response.ok) return;

        const data = await response.json();
        console.log("Donnée reçu de l'API:", data);
        setUsers(data.response);
        console.log(data.response);

      } catch (error) {
        console.log("Erreur:", error);
      }
    }
    fetchUsers();
  }, [session, shouldRefreshUsers]);



  // Suppression d'un utilisateur
  async function handleDelete(e, id) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/auth/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      console.log(response);

      if (!response) {
        console.log("Erreur lors de la suppression");
        return;
      }

      if (response.ok) {
        setShouldRefreshUsers(prev => !prev);
        console.log("Supprimer avec succès")
        return;
      }

    } catch (error) {
      console.log("Erreur:", error);
    }
  }

  if (isLoading) {
    return (
      <main>
        <p>Chargement...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main>
        <p>Non autorisé</p>
      </main>
    );
  }

  return (
    <main>
      <header>
        <h1>Gestion des utilisateurs</h1>
        {/* Ajout d'une barre de recherche */}
      </header>
      <section>
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} onClick={() => navigate(`/admin/users/${user.id}`)}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.roles_label}</td>
                  <td>
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/edituser/${user.id}`); }}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button onClick={(e) => handleDelete(e, user.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to={"/admin/dashboard"}>Retour au tableau de bord</Link>
      </section>
    </main>
  )
}

export default AdminUsers;
