import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import ValidateModal from "../../../components/modal/ValidateModal";
import "./products.scss";

function Products() {
  document.title = "Back office | Gestion des produits";
  const [products, setProducts] = useState(null);
  const [shouldRefreshProducts, setShouldRefreshProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

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

        if (!response) {
          setError("Aucun produits trouvés");
          setSuccess(false);
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setProducts(data.response);
          setError(null);
          setSuccess(false);
        }
      } catch (error) {
        setError("Erreur de réseau");
        setSuccess(null);
      }
    }
    fetchProducts();
  }, [shouldRefreshProducts]);

  // Affichage de la modal de validation
  function handleDeleteClick(e, product) {
    e.preventDefault();
    e.stopPropagation();
    setProductToDelete(product);
    setShowModal(true);
  }

  // Confirmation de la suppression
  async function handleValidateDelete() {
    if (!productToDelete) return;
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/products/${productToDelete.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Erreur lors de la suppression: ${errorData.message}`);
        setSuccess(false);
      } else {
        setShouldRefreshProducts(prev => !prev);
        setSuccess(true);
        setError(null);
      }
    } catch (error) {
      setError(`Erreur système: ${error.message}`);
      setSuccess(false);
    } finally {
      setShowModal(false);
      setProductToDelete(null);
    }
  }

  // Annuler la suppression
  function handleCancelDelete() {
    setShowModal(false);
    setProductToDelete(null);
  }

  // Click sur ligne d'un produit
  function handleRowClick(product) {
    setSelectedProduct(product);
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
    <main id="gestion-products">

      {/* Affichage de l'erreur */}
      {error && <div className="error-message">{error}</div>}

      {/* Affichage du message de succès */}
      { success && (
        <div className="success-message">
          Le produit a été supprimé avec succès !
        </div>
      )}

      <section className="list-products">
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Référence</th>
              <th>Quantitée</th>
              <th>Categorie</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id} onClick={() => handleRowClick(product)}>
                  <td>{product.title}</td>
                  <td>{product.ref}</td>
                  <td>{product.quantityInStock}</td>
                  <td>{product.categories_name}</td>
                  {/* Actions */}
                  <td>
                    <button className="btn-edit" onClick={() => navigate(`/admin/editproduct/${product.id}`, { state: { product } })}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className="btn-delete" onClick={(e) => handleDeleteClick(e, product)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {selectedProduct && (
          <div className="product-details">
            <h2>Détails du produit :</h2>
            <p><strong>Titre :</strong> {selectedProduct.title}</p>
            <p><strong>Sous-titre :</strong> {selectedProduct.undertitle}</p>
            <img
                src={`http://localhost:9000/API/upload/${selectedProduct.picture}`}
                alt={selectedProduct.alt}
                className="product-image"
            />
            <p><strong>Description :</strong> {selectedProduct.description}</p>
            <p><strong>Description image :</strong> {selectedProduct.alt}</p>
            <p><strong>Prix :</strong> {selectedProduct.price}€</p>
            <p><strong>Reference :</strong> {selectedProduct.ref}</p>
            <p><strong>Quantité en stock :</strong> {selectedProduct.quantityInStock}</p>
            <p><strong>Catégorie :</strong> {selectedProduct.categories_name}</p>
          </div>
        )}

        <div className="link-page-product">
          <Link to={"/admin/dashboard"} className="link-back">Retour au tableau de bord</Link>
          <Link to={"/admin/addproduct"} className="link-addproduct">Ajouter un produit</Link>
        </div>
      </section>

      {/* Modal de validation */}
      <ValidateModal
        show={showModal}
        message="Êtes-vous sûr de vouloir supprimer ce produit ?"
        onConfirm={handleValidateDelete}
        onCancel={handleCancelDelete}
      />
    </main>
  );
}

export default Products;
