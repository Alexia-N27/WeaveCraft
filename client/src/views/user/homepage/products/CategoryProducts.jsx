import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./categoryProducts.scss";

function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryLabel, setCategoryLabel] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductsByCategory() {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/products/category/${id}`,
          {
            method: "GET",
            headers: {
              "Accept" : "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          setError("Aucun produits trouvé pour cette catégorie");
          return;
        }

        const data = await response.json();
        setProducts(data.response);
        if (data.response.length > 0) {
          setCategoryLabel(data.response[0].categories_name);
        }
        setError(null);
      } catch (error) {
        setError("Erreur réseau", error);
      }
    }
    fetchProductsByCategory();
  }, [id]);

  return (
    <main id="category-products">
      <h1>{categoryLabel}</h1>
      {error && <div className="error-message">{error}</div>}

      <div className="product-flex-container">
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card">
            <img
                src={`http://localhost:9000/API/upload/${product.picture}`}
                alt={product.alt}
                className="product-image"
            />
            <h3>{product.title}</h3>
            <p>{product.price}€</p>
            <button className="add-to-cart-btn">
              Ajouter au panier
            </button>
          </Link>
        ))}
      </div>
      <Link to={"/"}>Retour à la boutique</Link>
    </main>
  );
}

export default CategoryProducts;
