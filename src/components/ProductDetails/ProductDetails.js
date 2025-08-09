// src/components/ProductDetails/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api';
import './ProductDetails.css';
import StarRating from '../RatingStar/RatingStar';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);   // ✅ correctement placé ici
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // 1. Charger le produit sélectionné
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);

        // 2. Charger tous les produits pour afficher les similaires
        const allRes = await API.get('/products');
        setAllProducts(allRes.data);

        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération du produit:', err);
        setError('Impossible de charger le produit.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} ajouté au panier !`);
  };

  const handleRating = (value) => {
    setRating(value);
    localStorage.setItem(`rating-${product._id}`, value);
  };

  if (loading) return <p>Chargement du produit...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Produit introuvable.</p>;

  // Construire l'URL complète si ton backend sert les images
  const fullImageUrl = API.defaults.baseURL + product.image;

  // Filtrer les produits similaires (exclure celui en cours)
  const similarProducts = allProducts.filter(p => p._id !== id).slice(0, 4);

  return (
    <div className="product-details">
      <div className="product-main">
        <img src={fullImageUrl} alt={product.name} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">{product.price} FCFA</p>
          <p className="description">{product.description || 'Pas encore disponible.'}</p>

          <StarRating rating={rating} onRate={handleRating} />

          <button className="add-to-cart" onClick={handleAddToCart}>
            Ajouter au panier
          </button>
        </div>
      </div>

      <div className="similar-products">
        <h3>Produits similaires</h3>
        <div className="similar-list">
          {similarProducts.map((p) => (
            <div key={p._id} className="similar-card">
              <img src={`${API.defaults.baseURL}${p.image}`} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.price} FCFA</p>
              <button onClick={() => addToCart(p)}>Ajouter au panier</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
