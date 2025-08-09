// src/components/Testimonials/Testimonials.js
import React from 'react';
import './Avis.css';
import personne from '../images/personne.jpg';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Fatou, Dakar',
      text: 'Service impeccable, produits de qualité. Je recommande vivement !',
    },
    {
      name: 'Mamadou, Thiès',
      text: 'Livraison rapide et service client très réactif. Bravo !',
    },
    {
      name: 'Aïssatou, Saint-Louis',
      text: 'Très satisfait de mes achats, je reviendrai !',
    },
    {
      name: 'Cheikh, Pikine',
      text: 'Les produits sont sûrs et très doux pour bébé. Merci Shield !',
    },
  ];

  return (
    <section className="testimonials-section" data-aos="fade-up" id='avis'>
      <h2 className="testimonials-title">
        <span>Ils ont testé, ils ont adoré !</span> <br />
        Découvrez ce que nos clients disent de leurs expériences avec nos produits.
      </h2>

      <div className="testimonials-grid">
        {reviews.map((review, index) => (
          <div className="testimonial-card" key={index} data-aos="zoom-in">
            <FaQuoteLeft className="quote-icon" />
            <img src={personne} alt="client" className="testimonial-photo" />
            <p className="testimonial-text">{review.text}</p>
            <p className="testimonial-author">{review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
