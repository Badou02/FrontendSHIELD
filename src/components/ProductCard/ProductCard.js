import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import StarRating from "../RatingStar/RatingStar";
import "./ProductCard.css";

// Fonction utilitaire pour récupérer une image (string ou objet)
// Fonction utilitaire pour récupérer l'URL de l'image
// src/components/ProductDetails/ProductDetails.js

const getImageUrl = (img) => {
// Récupère l'URL de l'image, que 'img' soit une chaîne ou un objet.
const url = typeof img === 'string' ? img : img?.url;

// Si l'URL n'est pas valide ou est manquante, retourne l'image par défaut.
if (!url) {
  return "/placeholder.png";
}

 // Si l'URL est complète (commence par http), la retourne directement.
 if (url.startsWith('http')) {
  return url;
 }
 // Si l'URL est relative (ex: /uploads/...), ajoute l'URL de base.
 const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
 return `${baseURL}${url}`;
};

export default function ProductCard({ product, onRate, addToCart }) {
  // Si le produit a plusieurs images, on les utilise sinon on prend product.image
  const imageList = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 50,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <Slider {...sliderSettings}>
          {imageList.map((img, index) => (
            <div key={index} className="slider-image-container">
              <img
                src={getImageUrl(img)}
                alt={product.name}
                className="product-image"
              />
            </div>
          ))}
        </Slider>
        <h5>{product.name}</h5>
        <p>{product.price} FCFA</p>
      </Link>
      <StarRating
        rating={product.rating}
        onRate={(value) => onRate(product._id, value)}
      />
      <button onClick={() => addToCart(product)}>Ajouter au panier</button>
    </div>
  );
}
