import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";
import StarRating from "../RatingStar/RatingStar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetails.css";

const getImageUrl = (img) => {
  const url = typeof img === "string" ? img : img?.url;
  if (!url) return "/placeholder.png";
  if (url.startsWith("http")) return url;
  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  return `${baseURL}${url}`;
};

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

  const imageList =
    product?.images && product.images.length > 0
      ? product.images
      : product?.image
      ? [product.image]
      : [];

  const sliderSettings = {
    dots: true,
    infinite: imageList.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: imageList.length > 1,
  };

  if (loading) return <p className="pd-loading">Chargement du produit...</p>;
  if (error)   return <p className="pd-error">{error}</p>;
  if (!product) return <p className="pd-error">Produit introuvable.</p>;

  return (
    <div className="product-details">
      <div className="product-main">

        {/* ── Zone image ── */}
        <div className="pd-image-zone">
          {imageList.length > 0 ? (
            <Slider {...sliderSettings} className="product-slider">
              {imageList.map((img, index) => (
                <div key={index} className="pd-slide">
                  <img
                    src={getImageUrl(img)}
                    alt={`${product.name}-${index}`}
                    className="pd-image"
                    onError={(e) => { e.target.src = "/placeholder.png"; }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="pd-slide">
              <img src="/placeholder.png" alt={product.name} className="pd-image" />
            </div>
          )}
        </div>

        {/* ── Infos ── */}
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">{product.price.toLocaleString()} FCFA</p>
          <p className="description">{product.description || "Pas encore disponible."}</p>
          <StarRating rating={rating} onRate={handleRating} />
          <button className="add-to-cart" onClick={handleAddToCart}>
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* ── Produits similaires ── */}
      <div className="similar-products">
        <h3>Produits similaires</h3>
        <div className="similar-list">
          {allProducts
            .filter((p) => p._id !== id)
            .slice(0, 4)
            .map((p) => (
              <div key={p._id} className="similar-card">
                <div className="similar-img-wrap">
                  <img
                    src={
                      p.images && p.images.length > 0
                        ? getImageUrl(p.images[0])
                        : "/placeholder.png"
                    }
                    alt={p.name}
                    onError={(e) => { e.target.src = "/placeholder.png"; }}
                  />
                </div>
                <div className="similar-body">
                  <h4>{p.name}</h4>
                  <p>{p.price.toLocaleString()} FCFA</p>
                  <button onClick={() => addToCart(p)}>Ajouter au panier</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;