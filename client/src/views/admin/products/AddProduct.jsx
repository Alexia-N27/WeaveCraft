import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./addProduct.scss";

function AddProduct() {
  document.title = "Back Office | Ajout de produit"

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    undertitle: "",
    description: "",
    picture: "",
    alt: "",
    price: "",
    quantityInStock: "",
    "categories_id": "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/products/",
        {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate("/admin/products");
      } else {
        console.log("Erreur lors de l'ajout du produit");
      }
    } catch (error) {
      console.log("Erreur:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <main>
      <h1>Ajouter un nouveau produit</h1>
      <form className="add-product" onSubmit={handleSubmit}>
        <label>
          Titre
          <input
            type="text"
            name="title"
            placeholder="Titre du produit"
            aria-label="Titre du produit"
            value={formData.title}
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
          />
        </label>

        <button type="Submit">Ajouter le produit</button>
      </form>
      <Link to="/admin/products">Retour à la page produit</Link>
    </main>
  );
}


export default AddProduct;
