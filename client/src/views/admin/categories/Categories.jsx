import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./categories.scss";

function Categories() {
  const [categories, setCategories] = useState(null);
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [shouldRefreshCategories, setShouldRefreshCategories] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryLabel, setEditingCategoryLabel] = useState("");

  useEffect(() => {
    document.title = "Back Office | Categories";
    async function fetchCategories() {
      const response = await fetch(
        "http://localhost:9000/api/v1/categories",
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
        }
      );

      if (!response) {
        return;
      }

      if(response.ok) {
        const data = await response.json();
        setCategories(data.response);
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
      } else {
        console.error("Erreur lors de l'ajout de la catégorie");
      }
    } catch (error) {
      console.error("Erreur:", error);
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
      } else {
        console.log("Erreur lors de la modification de la catégorie");
      }

    } catch (error) {
      console.log("Erreur:", error);
    }
  }

  function handleEditClick(category) {
    setEditingCategoryId(category.id);
    setEditingCategoryLabel(category.label);
  }

  // Suppression de catégorie
  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/categories/${id}` ,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setShouldRefreshCategories(prev => !prev);
      } else {
        console.log("Erreur lors de la suppression de la catégorie");
      }
    } catch (error) {
      console.log("Erreur:", error);
    }
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
    <main>
      <h1>Liste des categories</h1>
      <section>
        {/* Table categories */}
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
                    <button onClick={() => handleEditClick(category)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button onClick={(e) => handleDelete(e, category.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3>Ajouter une nouvelle categorie</h3>
        <form onSubmit={handleAddCategory}>
            <label>
              Nom de la catégorie
              <input
                type="text"
                value={newCategoryLabel}
                onChange={(e) => setNewCategoryLabel(e.target.value)}
                required
              />
            </label>
            <button type="submit">Ajouter</button>
        </form>

        {editingCategoryId && (
          <>
            <h3>Modifier une catégorie</h3>
            <form onSubmit={handleEditCategory}>
              <label>
                Nom de la catégorie
                <input
                  type="text"
                  value={editingCategoryLabel}
                  onChange={(e) => setEditingCategoryLabel(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Modifier</button>
              <button type="button" onClick={() => setEditingCategoryId(null)}>
                Annuler
              </button>
            </form>
          </>
        )}
        <Link to={"/admin/dashboard"}>Retour au tableau de bord</Link>
      </section>
    </main>
  )
}

export default Categories;
