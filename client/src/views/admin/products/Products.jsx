import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./products.scss";
// Ajout de pop up warning pour suppression.
function Products() {
  document.title = "Back office || Gestion des produits"
  const [products, setProducts] = useState(null);
  const [shouldRefreshProducts, setShouldRefreshProducts] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/products",
          {
            method: "GET",
            headers: {
              "Accept" : "application/json"
            },
            credentials: "include",
          }
        );

        if (!response) return;

        if (response.ok) {
          const data = await response.json();
          setProducts(data.response);
          console.log(data.response);
        }
      } catch (error) {
        console.log("Erreur", error);
      }
    }
    fetchProducts();
  }, [shouldRefreshProducts]);

  // Suppression d'un produit
  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/products/${id}`,
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
        setShouldRefreshProducts(prev => !prev);
      }
    } catch (error) {
      console.log("Erreur:", error);
    }
  }

  if(!products) {
    return (
      <main>
        <p>Chargement ...</p>
      </main>
    )
  }

  if(products.length === 0) {
    return (
      <main>
        <p>Pas de produits trouvée</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Bienvenue sur la page produits</h1>
      <section className="list-products">
        <Link to="/admin/addproduct">Ajouter un nouveau produit</Link>
        {/* Table products */}
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Titre</th>
              <th>Référence</th>
              <th>Quantitée en stock</th>
              <th>Prix</th>
              <th>Categorie</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.ref}</td>
                  <td>{product.quantityInStock}</td>
                  <td>{product.price}</td>
                  <td>{product.categories_name}</td>
                  {/* Actions */}
                  <td>
                    <button onClick={() => navigate(`/admin/editproduct/${product.id}`, { state: { product } })}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button onClick={(e) => handleDelete(e, product.id)}>
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

export default Products;
