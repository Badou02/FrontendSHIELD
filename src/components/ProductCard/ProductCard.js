// src/components/ProductCard/ProductCard.js
import React from 'react';
import './ProductCard.css';
import StarRating from '../RatingStar/RatingStar';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, onRate }) => {
  const handleAddToCart = (e) => {
    e.preventDefault(); // Évite la redirection
    e.stopPropagation(); // Empêche l'effet de clic du parent
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <img src={product.image} alt={product.name} className="product-image" />
        <h5 className="product-name">{product.name}</h5>
        <p className="product-price">{product.price.toLocaleString()} FCFA</p>
        
      </Link>
<StarRating rating={product.rating} onRate={(value) => onRate(product.id, value)} />
      <button className="add-to-cart" onClick={handleAddToCart}>
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProductCard;
