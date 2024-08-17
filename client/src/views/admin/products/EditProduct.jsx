import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import "./editProduct.scss";

function EditProduct() {
  document.title = "Back Office | Modification de produit"

  const { id } =useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    undertitle: "",
    description: "",
    picture: "",
    alt: "",
    price: 0,
    ref: "",
    quantityInStock: 0,
    "categories_id": "",
  });

  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch product by id
    async function fetchProduct() {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/products/${id}`,
          {
            method: "GET",
            headers: {
              "Accept" : "application/json"
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          const productData = data.response[0];
          setFormData({
            title: productData.title || "",
            undertitle: productData.undertitle || "",
            description: productData.description || "",
            picture: productData.picture || "",
            alt: productData.alt || "",
            price: productData.price || 0,
            ref: productData.ref || "",
            quantityInStock: productData.quantityInStock || 0,
            categories_id: productData.categories_id || "",
          });
          setError(null);
        } else {
          setError("Erreur lors du chargement des données du produit");
        }
      } catch (error) {
        setError("Erreur de réseau");
      }
    }

    // fetch les catégories
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
    fetchProduct();
  }, [id]);

  async function handleEditProduct(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/products/${id}`,
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
        setError(null);
        setSuccess(true);
      } else {
        setError("Erreur lors de la modification du produit", responseData.msg);
        setSuccess(false);
      }
    } catch (error) {
      setError("Erreur réseaux", error);
      setSuccess(false);
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
    <main id="editproduct">
      <h1>Modifier le produit</h1>

      {/* Affichage de l'erreur */}
      {error && <div className="error-message">{error}</div>}

      {/* Affichage du message succès */}
      {success && (
        <div className="success-message">
          Le produit à été modifié avec succès !
        </div>
      )}

      <form className="form-edit-product" onSubmit={handleEditProduct}>
        <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Titre du produit"
            aria-label="Titre du produit"
            value={formData.title}
            onChange={handleChange}
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
          />

        {/* Type a modifier */}
        <label htmlFor="picture">Image</label>
          <input
            type="text"
            id="picture"
            name="picture"
            placeholder="Ajouter une image"
            aria-label="Ajouter une image"
            value={formData.picture}
            onChange={handleChange}
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
          />

        <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Ajouter le prix"
            aria-label="Ajouter le prix"
            value={formData.price}
            onChange={handleChange}
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

        <button type="Submit">Modifier le produit</button>
      </form>
      <Link to="/admin/products">Retour à la page produit</Link>
    </main>
  );
}

export default EditProduct;
