import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ValidateModal from "../../../components/modal/ValidateModal";
import "./roles.scss";

function Roles() {
  document.title = "Back Office || Roles";
  const [roles, setRoles] = useState(null);
  const [newRoleLabel, setNewRoleLabel] = useState("");
  const [shouldRefreshRoles, setShouldRefreshRoles] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editingRoleLabel, setEditingRoleLabel] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/roles",
          {
            method: "GET",
            headers: {
              "Accept" : "application/json",
            },
            credentials: "include",
          }
        );

        if (!response) {
          setError("Aucun rôles trouvés");
          setSuccess(false);
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setRoles(data.response);
          setError(null);
          setSuccess(false);
        }
      } catch (error) {
        setError("Erreur de réseau");
        setSuccess(null);
      }
    }
    fetchRoles();
  }, [shouldRefreshRoles]);

  // Ajout de roles
  async function handleAddRole(e) {
    e.preventDefault();
    try {
      const response =await fetch(
        "http://localhost:9000/api/v1/roles",
        {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ label: newRoleLabel }),
        }
      );

      if (response.ok) {
        setNewRoleLabel(""),
        setShouldRefreshRoles(prev => !prev)
        setError(null);
        setSuccess(true);
      } else {
        setError("Erreur lors de l'ajout du rôle");
        setSuccess(false);
      }
    } catch (error) {
      setError("Erreur réseaux", error);
      setSuccess(false);
    }
  }

  // Modification de roles
  async function handleEditRole(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/roles/${editingRoleId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type" : "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ label: editingRoleLabel }),
        }
      );

      if (response.ok) {
        setEditingRoleId(null);
        setEditingRoleLabel("");
        setShouldRefreshRoles(prev => !prev);
        setError(null);
        setSuccess(false);
      } else {
        setError("Erreur lors de la modification du rôle");
        setSuccess(false);
      }
    } catch (error) {
      setError("Erreur reseaux", error);
      setSuccess(false);
    }
  }

  function handleEditClick(role) {
    setEditingRoleId(role.id);
    setEditingRoleLabel(role.label);
  }

  // Affichage de la modal
  function handleDeleteClick(e, role) {
    e.preventDefault();
    e.stopPropagation();
    setRoleToDelete(role);
    setShowModal(true);
  }

  // Suppresion de roles
  async function handleValidateDelete() {
    if (!roleToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/roles/${roleToDelete.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setShouldRefreshRoles(prev => !prev);
        setError(null);
        setSuccess(true);
      } else {
        setError("Erreur lors de la suppression du role");
        setSuccess(false);
      }
    } catch (error) {
      setError("Erreur reseaux", error)
      setSuccess(false);
    } finally {
      setShowModal(false);
      setRoleToDelete(null);
    }
  }

  // Annuler la suppression
  function handleCancelDelete() {
    setShowModal(false);
    setRoleToDelete(null);
  }

  if (!roles) {
    return (
      <main>
        <p>Chargement...</p>
      </main>
    );
  }

  if (roles.length === 0) {
    return (
      <main>
        <p>Pas de rôles trouvés</p>
      </main>
    );
  }

  return (
    <main id="gestion-role">
      <h1>Gestion des rôles</h1>

      {/* Affichage de l'erreur */}
      {error && <div className="error-message">{error}</div>}

      {/* Affichage du message de succès */}
      { success && (
        <div className="success-message">
          Le rôle à été ajouté avec succès !
        </div>
      )}

      <section className="role-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Label</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => {
              return (
                <tr key={role.id}>
                  <td>{role.id}</td>
                  <td>{role.label}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditClick(role)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className="btn-delete" onClick={(e) => handleDeleteClick(e, role)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <section className="add-edit-role">
        <h2>Ajouter un rôle</h2>
        <form className="form-role" onSubmit={handleAddRole}>
            <label htmlFor="role">Nom</label>
              <input
                type="text"
                id="role"
                placeholder="Nom du rôle"
                aria-label="Nom du rôle"
                value={newRoleLabel}
                onChange={(e) => setNewRoleLabel(e.target.value)}
                required
              />
            <button type="submit">Ajouter</button>
        </form>
        </section>

        <section className="add-edit-role">
        {editingRoleId && (
          <>
            <h2>Modifier un rôle</h2>
            <form className="form-role" onSubmit={handleEditRole}>
              <label htmlFor="role-edit">Nom</label>
                <input
                  type="text"
                  id="role-edit"
                  placeholder="Nom du rôle"
                  aria-label="Nom du rôle"
                  value={editingRoleLabel}
                  onChange={(e) => setEditingRoleLabel(e.target.value)}
                  required
                />
              <button type="submit">Modifier</button>
              <button type="button" onClick={() => setEditingRoleId(null)}>
                Annuler
              </button>
            </form>
          </>
        )}
        </section>
        <Link to={"/admin/dashboard"}>Retour au tableau de bord</Link>
      </section>

      {/* Modal de validation */}
      <ValidateModal
        show={showModal}
        message="Êtes-vous sûr de vouloir supprimer ce role ?"
        onConfirm={handleValidateDelete}
        onCancel={handleCancelDelete}
      />
    </main>
  );
}

export default Roles;
