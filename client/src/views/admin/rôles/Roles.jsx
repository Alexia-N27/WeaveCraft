import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./roles.scss";

function Roles() {
  const [roles, setRoles] = useState(null);
  const [newRoleLabel, setNewRoleLabel] = useState("");
  const [shouldRefreshRoles, setShouldRefreshRoles] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editingRoleLabel, setEditingRoleLabel] = useState("");

  useEffect(() => {
    document.title = "Back Office || Roles";
    async function fetchRoles() {
      const response = await fetch(
        "http://localhost:9000/api/v1/roles",
        {
          credentials: "include",
        }
      );

      if (!response) {
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setRoles(data.response);
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
      } else {
        console.error("Erreur lors de l'ajout du rôle");
      }
    } catch (error) {
      console.log("Erreur:", error);
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
      } else {
        console.log("Erreur lors de la modification du rôle");
      }
    } catch (error) {
      console.log("Erreur:", error);
    }
  }

  function handleEditClick(role) {
    setEditingRoleId(role.id);
    setEditingRoleLabel(role.label);
  }

  // Suppresion de roles
  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/roles/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setShouldRefreshRoles(prev => !prev);
      } else {
        console.log("Erreur lors de la suppression du role");
      }
    } catch (error) {
      console.log("Erreur:", error)
    }
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
    <main>
      <h1>Bienvenue sur la page Roles</h1>
      <section>
        {/* Table roles */}
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
                  {/* Actions */}
                  <td>
                    <button onClick={() => handleEditClick(role)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button onClick={(e) => handleDelete(e, role.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3>Ajouter une nouvelle categorie</h3>
        <form onSubmit={handleAddRole}>
            <label>
              Nom du role
              <input
                type="text"
                value={newRoleLabel}
                onChange={(e) => setNewRoleLabel(e.target.value)}
                required
              />
            </label>
            <button type="submit">Ajouter</button>
        </form>

        {editingRoleId && (
          <>
            <h3>Modifier une catégorie</h3>
            <form onSubmit={handleEditRole}>
              <label>
                Nom de la catégorie
                <input
                  type="text"
                  value={editingRoleLabel}
                  onChange={(e) => setEditingRoleLabel(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Modifier</button>
              <button type="button" onClick={() => setEditingRoleId(null)}>
                Annuler
              </button>
            </form>
          </>
        )}
        <Link to={"/admin/dashboard"}>Retour au tableau de bord</Link>
      </section>
    </main>
  );
}

export default Roles;
