// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" id='footer' data-aos="fade-up">
      <div className="footer-container">
        {/* Section Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p><FaPhone /> +221 77 639 07 50 </p>
          <p><FaPhone /> +221 77 116 70 04</p>
          <p><FaPhone /> +221 77 633 01 63</p>
          
          <p><FaEnvelope /> shieldsenegal484@gmail.com</p>
        </div>

        {/* Section Réseaux Sociaux */}
        <div className="footer-section">
          <h4>Suivez-nous</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61577495665671" target='blak'><FaFacebook /></a>
            <a href="https://www.instagram.com/shieldbabysenegal?igsh=MW82NWtid2JjZm9oYw%3D%3D&utm_source=qr" target='blak'><FaInstagram /></a>
            <a href="#Twitter"><FaTiktok /></a>
          </div>
        </div>

        {/* Section Liens rapides */}
        <div className="footer-section">
          <h4>Liens utiles</h4>
          <ul>
            <li><Link to="/#home">Accueil</Link></li>
            <li><Link to="/Allproducts">Nos Produits</Link></li>
            <li><a href="#avis">Avis Clients</a></li>
            <li><a href="#contact">Nous Contacter</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 - Shield Boutique. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
