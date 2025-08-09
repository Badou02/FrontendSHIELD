// src/components/Contact/ContactForm.js
import React, { useState } from 'react';
import './ContactForm.css';
import API from '../../api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post('/api/messages', formData);
    setSubmitted(true);
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      sujet: '',
      message: '',
    });
  } catch (err) {
    console.error("Erreur lors de l'envoi du message:", err);
    alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
  }
};



  return (
    <div className="contact-form-container" data-aos="fade-up"id='contact'>
      <h2>Laissez-nous un message</h2> 
      <p>Nous serons ravis de vous lire. <br/>
        Remplissez ce formulaire et notre équipe vous contactera rapidement.</p>


      <form onSubmit={handleSubmit}>
        <div className="form-group-row">
          <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
          <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
        </div>
        <div className="form-group-row">
          <input type="email" name="email" placeholder="Adresse Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} />
        </div>
        <input type="text" name="sujet" placeholder="Sujet" value={formData.sujet} onChange={handleChange} required />
        <textarea name="message" placeholder="Votre message..." rows="5" value={formData.message} onChange={handleChange} required />
        <button type="submit">Envoyer</button>
        {submitted && <p className="confirmation">✅ Votre message a été envoyé !</p>}
      </form>
    </div>
  );
};

export default ContactForm;
