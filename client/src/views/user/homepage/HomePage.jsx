import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./homepage.scss";
// img temporaire
import noPicture from "../../../assets/images/no-picture.jpg";

function HomePage() {
  document.title = "WeaveCraft";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch products
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

        if (!response) {
          setError("Aucun produits trouvés");
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setProducts(data.response);
          console.log("Products", data.response);
          setError(null);
        }
      } catch (error) {
        setError("Erreur de réseau");
      }
    }

    // fetch catégories
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
          return;
        }

        if(response.ok) {
          const data = await response.json();
          setCategories(data.response);
          console.log("Categories", data.response);
          setError(null);
        }
      } catch (error) {
        setError("Erreur de réseau");
      }
    }

    fetchProducts();
    fetchCategories();
  }, []);



  return (
    <div id="homepage">

      {/* Affichage de l'erreur */}
      {error && <div className="error-message">{error}</div>}

      <section className="categories">
        <div className="category-list">
          {categories.map((category) => (
            <Link to={`/categories/${category.id}`} key={category.id} className="category-item">
              {category.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="products">
        <div className="product-flex-container">
          {products.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} className="product-card">
              {/* <img src={product.picture} alt={product.alt} className="product-card" /> */}
              <img src={noPicture} alt={product.alt} className="product-image" />
              <h3>{product.title}</h3>
              <p>{product.price}€</p>
              <button className="add-to-cart-btn">
                Ajouter au panier
              </button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
