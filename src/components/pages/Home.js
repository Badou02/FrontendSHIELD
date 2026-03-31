// src/pages/Home.js
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../ProductsList/ProductsList';
import ProductCard from '../ProductCard/ProductCard';
import Avis from "../Avis/Avis.js";
import Localisation from '../Localisation/Localisation.js';
import ContactForm from '../ContactForm/ContactForm.js';
import Imageface from '../images/Imageface.jpeg';
import SlideOne from '../images/SlideOne.jpeg';
import SlideTWO from '../images/exemplephotoONE.jpeg';
import SlideFOUR from '../images/exemplephotofour.jpeg';
import Slidethree from '../images/exemplephotothree.jpeg';
import video from '../images/video_french.mp4';
import videoOne from '../images/PrésentationdesProduitsShield..mp4';
import API from '../../api';

const Home = ({ addToCart }) => {
  const videoRef = useRef();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products?limit=15');
        setProducts(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des produits", err);
      }
    };
    fetchProducts();
  }, []);

  const onRate = (productId, value) => {
    const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    storedRatings[productId] = value;
    localStorage.setItem("ratings", JSON.stringify(storedRatings));
  };

  return (
    <div className="container-fluid mt-4">

      {/* ── Hero ── */}
      <div className="about-section" id="about-section">
        <div className="overlay">
          <h1>À propos de Shield</h1>
          <p>
            Bienvenue chez Shield Company, l'univers douceur des tout-petits.
            Nous vous proposons les meilleurs produits bébé de la marque Shield :
            couches, lotions, et toiletries pensés pour le confort et le bien-être de votre enfant.
          </p>
        </div>
      </div>

      {/* ── Nos produits ── */}
      <h2 className="mb-4">Nos produits</h2>
      <div className="home-products-container" data-aos="zoom-in">
        {products.slice(0, 15).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={addToCart}
            onRate={onRate}
          />
        ))}
      </div>

      <div className="see-all-link">
        <Link to="/allproducts">Voir tous les produits →</Link>
      </div>

      {/* ── Bandeau ── */}
      <div className="modern-message">
        <i className="fas fa-shield-alt icon"></i>
        <h4>Chez Shield, chaque article est pensé pour allier sécurité et confort.</h4>
      </div>

      {/* ── Image + Vidéo ── */}
      <div className="imageFace" data-aos="fade-up">
        <img src={Imageface} alt="Shield Baby" />
        <video ref={videoRef} src={video} autoPlay muted loop playsInline />
      </div>

      {/* ── Carousel produits ── */}
      <ProductList products={products} onAddToCart={addToCart} onRate={onRate} />

      <Avis />

      {/* ── Galerie ── */}
      <div className="slide" data-aos="fade-up">
        <img src={SlideOne}   alt="Shield 1" />
        <img src={SlideTWO}   alt="Shield 2" />
        <img src={Slidethree} alt="Shield 3" />
        <img src={SlideFOUR}  alt="Shield 4" />
      </div>

      <ContactForm />

      {/* ── Vidéo présentation ── */}
      <div className="PresentationProduits">
        <video src={videoOne} autoPlay muted loop playsInline controls/>
      </div>

      <Localisation />
    </div>
  );
};

export default Home;