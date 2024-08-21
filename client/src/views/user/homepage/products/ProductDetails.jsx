import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./productDetails.scss";
// img temporaire
import noPicture from "../../../../assets/images/no-picture.jpg";

function ProductDetails() {
  document.title = "Produit";
  const { id } = useParams();
  const [productById, setProductById] = useState(null);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await fetch(
          `http://localhost:9000/api/v1/products/${id}`,
          {
            method: "GET",
            headers: {
              "Accept" : "application/json",
            },
            credentials: "include",
          }
        );

        console.log("RESPONSE PRODUIT", response);

        if (!response.ok) {
          console.log("Aucun produit trouvé");
          return;
        }

        const data = await response.json();
        console.log("PRODUIT DETAILS", data.response[0]);
        setProductById(data.response[0]);
      } catch (error) {
        console.log("Erreur réseaux", error);
      }
    }
    fetchProductDetails();
  }, [id]);

  if (!productById) {
    return <p>Chargement...</p>;
  }

  return (
    <main id="product-details">
      <h1>Détails du produit</h1>
      <h2>{productById.title}</h2>
      <h3>{productById.undertitle}</h3>
      {/* <img src={productById.picture} alt={productById.alt} className="product-card" /> */}
      <img src={noPicture} alt={productById.alt} className="product-image" />
      <p>{productById.description}</p>
      <p>{productById.price}€</p>
      <p>Quantitée disponible: {productById.quantityInStock}</p>
    </main>
  )
}

export default ProductDetails;
