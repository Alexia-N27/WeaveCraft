import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
// Remplacer useLocation par useParams

import "./editProduct.scss";

function EditProduct() {
  document.title = "Back Office | Modification de produit"

  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product || {};

  const [formData, setFormData] = useState({
    title: product.title || "",
    undertitle: product.undertitle || "",
    description: product.description || "",
    picture: product.picture || "",
    alt: product.alt || "",
    price: product.price || 0,
    ref: product.ref || "",
    quantityInStock: product.quantityInStock || 0,
    "categories_id": product.categories_id || 0,
  });

  async function handleEditProduct(e) {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/products/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const responseData = await response.json();
      console.log("Server Response:", responseData);

      if (response.ok) {
        navigate("/admin/products")
      } else {
        console.log("Erreur lors de la modification du produit", responseData.msg);
      }
    } catch (error) {
      console.log("Erreur:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <main>
      <h1>Bienvenue sur la modification de produit</h1>
      <form className="edit-product" onSubmit={handleEditProduct}>
        <label>
          Titre
          <input
            type="text"
            name="title"
            placeholder="Titre du produit"
            aria-label="Titre du produit"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Sous-titre
          <input
            type="text"
            name="undertitle"
            placeholder="Sous-titre du produit"
            aria-label="Sous-titre du produit"
            value={formData.undertitle}
            onChange={handleChange}
          />
        </label>

        <label>
          Description
          <input
            type="text"
            name="description"
            placeholder="Description du produit"
            aria-label="Description du produit"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        {/* Type a modifier */}
        <label>
          Image
          <input
            type="text"
            name="picture"
            placeholder="Ajouter une image"
            aria-label="Ajouter une image"
            value={formData.picture}
            onChange={handleChange}
          />
        </label>

        <label>
          Alt
          <input
            type="text"
            name="alt"
            placeholder="Ajouter un alt"
            aria-label="Ajouter un alt"
            value={formData.alt}
            onChange={handleChange}
          />
        </label>

        <label>
          Prix
          <input
            type="number"
            name="price"
            placeholder="Ajouter le prix"
            aria-label="Ajouter le prix"
            value={formData.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Quantité en stock
          <input
            type="number"
            name="quantityInStock"
            placeholder="Quantité en stock"
            aria-label="Quantité en stock"
            value={formData.quantityInStock}
            onChange={handleChange}
          />
        </label>

        <label>
          Id de la catégorie
          <input
            type="text"
            name="categories_id"
            placeholder="Catégorie"
            aria-label="Catégorie"
            value={formData["categories_id"]}
            onChange={handleChange}
          />
        </label>

        <button type="Submit">Modifier le produit</button>
      </form>
      <Link to="/admin/products">Retour à la page produit</Link>
    </main>
  )
}

export default EditProduct;
