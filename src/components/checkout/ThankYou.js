// src/components/checkout/ThankYou.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <h2>✅ Merci pour votre commande !</h2>
      <p>Nous traitons votre commande. Vous recevrez bientôt un email de confirmation.</p>
      <Link to="/" className="btn-home">Retour à l'accueil</Link>
    </div>
  );
};

export default ThankYou;
