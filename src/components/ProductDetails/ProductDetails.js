// src/components/ProductDetails/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import "./ProductDetails.css";
import StarRating from "../RatingStar/RatingStar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);

        const allRes = await API.get("/products");
        setAllProducts(allRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération du produit:", err);
        setError("Impossible de charger le produit.");
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

  // Fonction pour récupérer l'URL correcte
  const getImageUrl = (img) => {
    if (!img) return "/placeholder.png";
    return typeof img === "string" ? img : img.url || "/placeholder.png";
  };

  // Préparer la liste d’images pour le slider
  const imageList =
    product?.images && product.images.length > 0
      ? product.images
      : product?.image
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

  if (loading) return <p>Chargement du produit...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Produit introuvable.</p>;

  return (
    <div className="product-details">
      <div className="product-main">
        {/* Slider images */}
        {imageList.length > 0 ? (
          <Slider {...sliderSettings} className="product-slider">
            {imageList.map((img, idx) => (
              <div key={idx} className="slider-image-container">
                <img
                  src={getImageUrl(img)}
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

        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">{product.price.toLocaleString()} FCFA</p>
          <p className="description">
            {product.description || "Pas encore disponible."}
          </p>

          <StarRating rating={rating} onRate={handleRating} />

          <button className="add-to-cart" onClick={handleAddToCart}>
            Ajouter au panier
          </button>
        </div>
      </div>

      <div className="similar-products">
        <h3>Produits similaires</h3>
        <div className="similar-list">
          {allProducts
            .filter((p) => p._id !== id)
            .slice(0, 4)
            .map((p) => (
              <div key={p._id} className="similar-card">
                <img
                  src={
                    p.images && p.images.length > 0
                      ? getImageUrl(p.images[0])
                      : p.image
                      ? getImageUrl(p.image)
                      : "/placeholder.png"
                  }
                  alt={p.name}
                />
                <h4>{p.name}</h4>
                <p>{p.price.toLocaleString()} FCFA</p>
                <button onClick={() => addToCart(p)}>Ajouter au panier</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
