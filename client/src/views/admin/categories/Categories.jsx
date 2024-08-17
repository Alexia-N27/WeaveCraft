import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ValidateModal from "../../../components/modal/ValidateModal";
import "./categories.scss";

function Categories() {
  document.title = "Back Office | Categories";
  const [categories, setCategories] = useState(null);
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [shouldRefreshCategories, setShouldRefreshCategories] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryLabel, setEditingCategoryLabel] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/categories",
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
            credentials: "include",
          }
        );

        if (!response) {
          setError("Aucune catégories trouvées");
          setSuccess(false);
          return;
        }

        if(response.ok) {
          const data = await response.json();
          setCategories(data.response);
          setError(null);
          setSuccess(false);
        }
      } catch (error) {
        setError("Erreur de réseau");
        setSuccess(null);
      }
    }
    fetchCategories();
  }, [shouldRefreshCategories]);

  // Ajout de catégorie
  async function handleAddCategory(e) {
    e.preventDefault();

    // Validation vide
    if(!newCategoryLabel.trim()) {
      alert("Le champ du nom de la catégorie ne peut pas être vide");
      return;
    }

    // Validation de longueur minimal
    if(newCategoryLabel.trim().length < 4) {
      alert("Le nom de la catégorie doit contenir au moins 4 caractères");
      return;
    }

    // validation de format
    const labelPattern = /^[a-zA-Z\s]+$/;
    if(!labelPattern.test(newCategoryLabel.trim())) {
      alert("")
    }

    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/categories",
        {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ label: newCategoryLabel }),
        }
      );

      if (response.ok) {
        setNewCategoryLabel("");
        setShouldRefreshCategories(prev => !prev);
        setError(null);
        setSuccess(true);
      } else {
        setError("Erreur lors de l'ajout de la catégorie");
        setSuccess(false);
      }
    } catch (error) {
      setError("Erreur réseaux", error);
      setSuccess(false);
    }
  }

  // Modification de catégorie
  async function handleEditCategory(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/categories/${editingCategoryId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({ label: editingCategoryLabel }),
          credentials: "include",
        }
      );

      if (response.ok) {
        setEditingCategoryId(null);
        setEditingCategoryLabel("");
        setShouldRefreshCategories(prev => !prev);
        setError(null);
        setSuccess(false);
      } else {
        setError("Erreur lors de la modification de la catégorie");
        setSuccess(false);
      }
    } catch (error) {
      setError("Erreur reseaux", error);
      setSuccess(false);
    }
  }

  function handleEditClick(category) {
    setEditingCategoryId(category.id);
    setEditingCategoryLabel(category.label);
  }

    // Affichage de la modal
    function handleDeleteClick(e, category) {
      e.preventDefault();
      e.stopPropagation();
      setCategoryToDelete(category);
      setShowModal(true);
    }

  // Suppression de catégorie
  async function handleValidateDelete() {
    if (!categoryToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/categories/${categoryToDelete.id}` ,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setShouldRefreshCategories(prev => !prev);
        setError(null);
        setSuccess(true);
      } else {
        setError("Erreur lors de la suppression de la catégorie");
        setSuccess(false);
      }
    } catch (error) {
      setError("Erreur reseaux", error)
      setSuccess(false);
    } finally {
      setShowModal(false);
      setCategoryToDelete(null);
    }
  }

  // Annuler la suppression
  function handleCancelDelete() {
    setShowModal(false);
    setCategoryToDelete(null);
  }

  if (!categories) {
    return (
      <main>
        <p>Chargement...</p>
      </main>
    );
  }

  if (categories.length === 0) {
    return (
      <main>
        <p>Pas de catégories trouvées</p>
      </main>
    );
  }

  return (
    <main id="gestion-categorie">
      <h1>Liste des categories</h1>

      {/* Affichage de l'erreur */}
      {error && <div className="error-message">{error}</div>}

      {/* Affichage du message de succès */}
      { success && (
        <div className="success-message">
          Le rôle à été ajouté avec succès !
        </div>
      )}

      <section className="categorie-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Label</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.label}</td>
                  {/* Actions */}
                  <td>
                    <button className="btn-edit" onClick={() => handleEditClick(category)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className="btn-delete" onClick={(e) => handleDeleteClick(e, category)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <section className="add-edit-category">
        <h2>Ajouter une nouvelle catégorie</h2>
        <form className="form-category" onSubmit={handleAddCategory}>
            <label htmlFor="categorie">Nom de la catégorie</label>
              <input
                type="text"
                id="categorie"
                placeholder="Nom de catégorie"
                aria-label="Nom de catégorie"
                value={newCategoryLabel}
                onChange={(e) => setNewCategoryLabel(e.target.value)}
                required
              />
            <button type="submit">Ajouter</button>
        </form>
        </section>

        <section className="add-edit-category">
        {editingCategoryId && (
          <>
            <h2>Modifier une catégorie</h2>
            <form className="form-category" onSubmit={handleEditCategory}>
              <label htmlFor="categorie-edit">Nom de la catégorie</label>
                <input
                  type="text"
                  id="categorie-edit"
                  placeholder="Nom de categorie"
                  aria-label="Nom de categorie"
                  value={editingCategoryLabel}
                  onChange={(e) => setEditingCategoryLabel(e.target.value)}
                  required
                />
              <button type="submit">Modifier</button>
              <button type="button" onClick={() => setEditingCategoryId(null)}>
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
        message="Êtes-vous sûr de vouloir supprimer cette catégorie ?"
        onConfirm={handleValidateDelete}
        onCancel={handleCancelDelete}
      />
    </main>
  )
}

export default Categories;
