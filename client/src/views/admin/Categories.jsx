import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState(null);
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [shouldRefreshCategories, setShouldRefreshCategories] = useState(false);

  useEffect(() => {
    document.title = "Back Office | Categories";
    async function fetchCategories() {
      const response = await fetch(
        "http://localhost:9000/api/v1/categories",
        {
          credentials: "include",
        }
      );
      if (response.status === 401) {
        console.log("Non autorisé");
        return;
      }
      if(response.ok) {
        const data = await response.json();
        setCategories(data.response);
      }
    }
    fetchCategories();
  }, [shouldRefreshCategories]);

  async function handleAddCategory(e) {
    e.preventDefault();
    // Ajouter une validation
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

  if(!categories) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    )
  }

  if(categories.length === 0) {
    return (
      <main>
        <p>Pas de catégories trouvées</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Liste des categories</h1>
      <section>
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
                  <td>
                    <Link to={"/edit/" + category.id}>Modifier</Link>
                    <button>Supprimer</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>Ajouter une nouvelle categorie</h3>
        <form onSubmit={handleAddCategory}>
            <label htmlFor="label">
              Nom de la catégorie :
              <input
                type="text"
                value={newCategoryLabel}
                onChange={(e) => setNewCategoryLabel(e.target.value)}
              />
            </label>
            <button type="submit">Ajouter</button>
        </form>
      </section>
    </main>
  )
}

export default Categories;
