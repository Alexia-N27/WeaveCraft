import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./addProduct.scss";

function AddProduct() {
  document.title = "Back Office | Ajout de produit"

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    undertitle: "",
    description: "",
    picture: null,
    alt: "",
    price: "",
    quantityInStock: "",
    "categories_id": "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
          console.log(data.response);
        }
      } catch (error) {
        setError("Erreur réseaux", error);
        setSuccess(false);
      }
    }
    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === "picture" && formData[key]) {
        fd.append(key, formData[key]);
      } else {
        fd.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/products/",
        {
          method: "POST",
          credentials: "include",
          body: fd,
        }
      );

      if (response.ok) {
        navigate("/admin/products");
        setSuccess(true);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Erreur lors de l'ajout du produit");
        setSuccess(false);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setSuccess(false);
      setError("Erreur de réseau");
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  }

  return (
    <main id="addproduct">
      <h1>Ajouter un nouveau produit</h1>

      {/* Affichage de l'erreur */}
      {error && <div className="error-message">{error}</div>}

      {/* Affichage du message succès */}
      {success && (
        <div className="success-message">
          Le produit à été ajouté avec succès !
        </div>
      )}

      <form className="form-add-product" onSubmit={handleSubmit}>
        <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Titre du produit"
            aria-label="Titre du produit"
            value={formData.title}
            onChange={handleChange}
            required
          />

        <label htmlFor="undertitle">Sous-titre</label>
          <input
            type="text"
            id="undertitle"
            name="undertitle"
            placeholder="Sous-titre du produit"
            aria-label="Sous-titre du produit"
            value={formData.undertitle}
            onChange={handleChange}
            required
          />

        <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Description du produit"
            aria-label="Description du produit"
            value={formData.description}
            onChange={handleChange}
            required
          />

        <label htmlFor="picture">Image</label>
          <input
            type="file"
            id="picture"
            name="picture"
            aria-label="Ajouter une image"
            onChange={handleChange}
            required
          />

        <label htmlFor="alt">Alt</label>
          <input
            type="text"
            id="alt"
            name="alt"
            placeholder="Ajouter un alt"
            aria-label="Ajouter un alt"
            value={formData.alt}
            onChange={handleChange}
            required
          />

        <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            placeholder="Ajouter le prix"
            aria-label="Ajouter le prix"
            value={formData.price}
            onChange={handleChange}
            required
          />

        <label htmlFor="quantityInStock">Quantité en stock</label>
          <input
            type="number"
            id="quantityInStock"
            name="quantityInStock"
            placeholder="Quantité en stock"
            aria-label="Quantité en stock"
            value={formData.quantityInStock}
            onChange={handleChange}
            required
          />

          <label htmlFor="category">Catégorie</label>
          <select
            id="category"
            name="categories_id"
            aria-label="Sélectionner une catégorie"
            value={formData["categories_id"]}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>

        <button type="Submit">Ajouter le produit</button>
      </form>
      <Link to="/admin/products">Retour à la page produit</Link>
    </main>
  );
}


export default AddProduct;
