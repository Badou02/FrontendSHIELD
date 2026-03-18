import React from "react";
import { Link } from "react-router-dom";
import StarRating from "../RatingStar/RatingStar";
import "./ProductCard.css";

const getImageUrl = (img) => {
  const url = typeof img === "string" ? img : img?.url;
  if (!url) return "/placeholder.png";
  if (url.startsWith("http")) return url;
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  return `${baseURL}${url}`;
};

export default function ProductCard({ product, onRate, onAddToCart, addToCart }) {
  const handleAddToCart = onAddToCart || addToCart;

  const imageList =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : ["/placeholder.png"];

  const mainImage = getImageUrl(imageList[0]);

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        {/* ✅ Image simple — SANS Slick Slider */}
        <div className="product-card-media">
          <img
            src={mainImage}
            alt={product.name}
            className="product-image"
            onError={(e) => { e.target.src = "/placeholder.png"; }}
          />
          {imageList.length > 1 && (
            <span className="product-image-count">+{imageList.length - 1}</span>
          )}
        </div>
        <div className="product-card-body">
          <h5>{product.name}</h5>
          <p className="product-price">{Number(product.price).toLocaleString()} FCFA</p>
        </div>
      </Link>
      <div className="product-card-footer">
        <StarRating
          rating={product.rating}
          onRate={(value) => onRate && onRate(product._id, value)}
        />
        <button onClick={() => handleAddToCart && handleAddToCart(product)}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}