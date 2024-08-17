import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useSession from "../../../hooks/useSession";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ValidateModal from "../../../components/modal/ValidateModal";
import "./adminUsers.scss";

function AdminUsers() {
  document.title = "Back office || Gestion des utilisateurs";
  const { session, isLoading } = useSession();
  const [users, setUsers] = useState([]);
  const [shouldRefreshUsers, setShouldRefreshUsers] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate();

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

        if (!response) {
          setError("Aucun produits trouvés");
          setSuccess(false);
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setUsers(data.response);
          setError(null);
          setSuccess(false);
        }

      } catch (error) {
        setError("Erreur de réseau");
        setSuccess(null);
      }
    }
    fetchUsers();
  }, [session, shouldRefreshUsers]);

  // Affichage de la modal de validation
  function handleDeleteClick(e, user) {
    e.preventDefault();
    e.stopPropagation();
    setUserToDelete(user);
    setShowModal(true);
  }

  // Suppression d'un utilisateur
  async function handleValidateDelete() {
    if (!userToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/auth/${userToDelete.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response) {
        setError("Erreur lors de la suppression");
        setSuccess(false);
      }

      if (response.ok) {
        setShouldRefreshUsers(prev => !prev);
        setSuccess(true);
        setError(null);
      }
    } catch (error) {
      setError(`Erreur système: ${error.message}`);
      setSuccess(false);
    } finally {
      setShowModal(false);
      setUserToDelete(null);
    }
  }

    // Annuler la suppression
    function handleCancelDelete() {
      setShowModal(false);
      setUserToDelete(null);
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
    <main id="gestion-users">
        <h1>Gestion des utilisateurs</h1>

        {/* Affichage de l'erreur */}
        {error && <div className="error-message">{error}</div>}

        {/* Affichage du message de succès */}
        { success && (
          <div className="success-message">
            Récupération de tout les utilisateurs avec succès !
          </div>
        )}

      <section className="list-users">
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
                    <button className="btn-edit" onClick={(e) => { e.stopPropagation(); navigate(`/admin/edituser/${user.id}`); }}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className="btn-delete" onClick={(e) => handleDeleteClick(e, user)}>
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

      {/* Modal de validation */}
      <ValidateModal
        show={showModal}
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
        onConfirm={handleValidateDelete}
        onCancel={handleCancelDelete}
      />
    </main>
  );
}

export default AdminUsers;
