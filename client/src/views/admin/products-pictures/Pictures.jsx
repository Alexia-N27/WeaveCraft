import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./pictures.scss";

function Pictures() {
  document.title = "Back Office | Images"
  const [pictures, setPictures] = useState("");
  const [addPictureSrc, setAddPictureSrc] = useState("");
  const [addPictureAlt, setAddPictureAlt] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPictures() {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/additionalPictures", {
            method: "GET",
            headers: {
              "Accept" : "application/json",
            },
            credentials: "include",
          }
        );

        console.log("Response : ", response);

        if (!response.ok) {
          setError("Erreur de chargement des images");
          return;
        }

        const data = await response.json();
        setPictures(data.response);
        console.log("DATA : ", data.response);
        setError(null);
      } catch (error) {
        setError("Erreur de réseau");
      }
    }
    fetchPictures();
  }, []);

  // Ajout d'une image
  async function handleAddPicture(e) {
    e.preventDefault();

    if (!addPictureSrc || !addPictureAlt || !selectedProductId) {
      alert("Tous les champs doivent être remplis");
      return;
    }

    const formData = new FormData();
    formData.append('picture_src', addPictureSrc);
    formData.append('alt', addPictureAlt);
    formData.append('products_id', selectedProductId);

    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/additionalPictures", {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (response.ok) {
        setAddPictureSrc("");
        setAddPictureAlt("");
        setSelectedProductId("");
      } else {
        setError("Erreur lors de l'ajout de l'image");
      }
    } catch (error) {
      setError("Erreur réseau", error);
    }
  }

  // Modification d'une image

  // Suppression d'une image

  if (!pictures) {
    return (
      <main>
        <p>Chargement...</p>
      </main>
    );
  }

  if (pictures.length === 0) {
    return (
      <main>
        <p>Aucune image trouvée</p>
      </main>
    );
  }

  return (
    <main id="gestion-image">
      <h1>Liste des images</h1>

      {/* Affichage de l'erreur */}
      {error && <div className="error-message">{error}</div>}

      <section className="picture-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Description</th>
              <th>Produit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {pictures.map((picture) => (
              <tr key={picture.id}>
                <td>{picture.id}</td>
                <td>
                  <img
                    src={`http://localhost:9000/API/upload/${picture.picture_src}`}
                    alt={picture.alt}
                    width="100"
                    height="100"
                    // onError={(e) => e.target.style.display = 'none'} // Masquer l'image en cas d'erreur
                  />
                </td>
                <td>{picture.alt}</td>
                <td>{picture.products_name}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section className="add-edit-picture">
          <h2>Ajouter une nouvelle image</h2>
          <form className="form-picture" onSubmit={handleAddPicture}>
            <label htmlFor="picture_src">Source de l&apos;image</label>
            <input
              type="file"
              id="picture_src"
              placeholder="Choisir une image"
              onChange={(e) => setAddPictureSrc(e.target.files[0])}
              required
            />
            <label htmlFor="picture-alt">Description de l&apos;image</label>
            <input
              type="text"
              id="picture-alt"
              placeholder="Description de l'image"
              value={addPictureAlt}
              onChange={(e) => setAddPictureAlt(e.target.value)}
              required
            />
            <label htmlFor="product-id">ID du produit</label>
            <input
              type="text"
              id="product-id"
              placeholder="ID du produit"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              required
            />
            <button type="submit">Ajouter</button>
          </form>
        </section>

        <section className="add-edit-picture">
          <h1>Edit</h1>
        </section>

        <Link to={"/admin/dashboard"}>Retour au tableau de bord</Link>
      </section>

    </main>
  );
}

export default Pictures;
