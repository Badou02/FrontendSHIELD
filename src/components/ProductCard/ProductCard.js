// src/components/ProductCard/ProductCard.js
import React from "react";
import "./ProductCard.css";
import StarRating from "../RatingStar/RatingStar";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = ({ product, onAddToCart, onRate }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  // Préparer la liste d’images
  const imageList =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  // Paramètres du slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        {imageList.length > 0 ? (
          <Slider {...sliderSettings}>
            {imageList.map((img, idx) => (
              <div key={idx} className="slider-image-container">
                <img
                  src={typeof img === "string" ? img : img.url || "/placeholder.png"}
                  alt={`${product.name}-${idx}`}
                  className="product-image"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <img
            src="/placeholder.png"
            alt={product.name}
            className="product-image"
          />
        )}

        <h5 className="product-name">{product.name}</h5>
        <p className="product-price">{product.price.toLocaleString()} FCFA</p>
      </Link>

      <StarRating
        rating={product.rating}
        onRate={(value) => onRate(product._id, value)}
      />

      <button className="add-to-cart" onClick={handleAddToCart}>
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProductCard;
