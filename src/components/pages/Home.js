// src/pages/Home.js 
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../ProductsList/ProductsList';
import Avis from "../Avis/Avis.js"
import Localisation from '../Localisation/Localisation.js';
import ContactForm from '../ContactForm/ContactForm.js'
import StarRating from '../RatingStar/RatingStar.js';
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
    // Charger les produits depuis le backend
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products?limit=12');
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
    console.log(`Produit ${productId} noté : ${value} étoiles (stocké localement)`);
  };

  return (    
    <div className=" container-fluid mt-4">
      <div className="about-section" id='about-section'>
        <div className="overlay">
          <h1>À propos de Shield</h1>
          <p>
            Bienvenue chez shield company, l’univers douceur des tout-petits. 
            Nous vous proposons les meilleurs produits bébé de la marque Shield : 
            couches, lotions, et toiletries pensés pour le confort et le bien-être de votre enfant.
            Douceur, qualité et sécurité au rendez-vous.
          </p>
        </div>
      </div>

      <h2 className="mb-4">Nos produits</h2>

      <div className="home-products-container" data-aos="zoom-in">
        {products.slice(0, 12).map((product) => (
          <div className="product-card" key={product._id}>
            <Link to={`/product/${product._id}`} className="product-link">
              <img src={product.image} alt={product.name} />
              <h5>{product.name}</h5>
              <p>{product.price} FCFA</p>
            </Link>
            <StarRating rating={product.rating} onRate={(value) => onRate(product._id, value)} />
            <button onClick={() => addToCart(product)}>Ajouter au panier</button>
          </div>
        ))}
      </div>

      <div className="see-all-link">
        <Link to="/allproducts">Voir tous les produits →</Link>
      </div> 
      
      <br/>
      <div className="modern-message">
        <i className="fas fa-shield-alt icon"></i>
        <h4>Chez Shield, chaque article est pensé pour allier sécurité et confort.</h4> 
      </div>
      
      <br/>
      <div className='imageFace' data-aos="fade-up">
        <img src={Imageface} alt='face' />
        <video 
          ref={videoRef}
          src={video} 
          autoPlay 
          muted 
          loop 
          playsInline 
        />
      </div>
      
      <br/>
      <ProductList products={products} onAddToCart={addToCart} onRate={onRate} data-aos="fade-up"/>
      <Avis />
      
      <div className='slide' data-aos="fade-up">
        <img src={SlideOne} alt='face' />
        <img src={SlideTWO} alt='face' />
        <img src={Slidethree} alt='face' />
        <img src={SlideFOUR} alt='face' />
        

      </div>
      
      <ContactForm/>

      <div className='PresentationProduits'>
         <video 
          ref={videoRef}
          src={videoOne} 
          autoPlay 
          muted 
          loop 
          playsInline 
        />
      </div>

      <Localisation />
    </div>
  );
}; 

export default Home;
