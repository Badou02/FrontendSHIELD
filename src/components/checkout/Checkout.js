// src/components/checkout/Checkout.js
import React, { useState } from 'react';
import './Checkout.css';
import API from '../../api';
import { useNavigate } from 'react-router-dom';



const Checkout = ({ totalAmount, cartItems, userId, clearCart}) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardInfo, setCardInfo] = useState({ number: '', name: '', exp: '', cvv: '' });

  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Veuillez choisir un mode de paiement.');
      return;
    }

    if ((paymentMethod === 'orange' || paymentMethod === 'wave') && !phoneNumber) {
      alert('Veuillez entrer un numéro de téléphone.');
      return;
    }

    // Simuler paiement
    alert(`Paiement de ${totalAmount} FCFA via ${paymentMethod.toUpperCase()}`);

    try {
      const token = localStorage.getItem('token');

      const transformedItems = cartItems.map(item => ({
      product: item._id,
      quantity: 1,
      price: item.price
    }));

    const order = {
      items: transformedItems,
      user: userId,
      totalAmount
    };
      await API.post('/orders', order, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Commande enregistrée avec succès !');
      clearCart();
      navigate('/thank-you');
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la commande");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Paiement</h2>
      <p>Total à payer : <strong>{totalAmount} FCFA</strong></p>

      <div className="payment-methods">
        <label>
          <input type="radio" value="wave" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} />
          Wave
        </label>
        <label>
          <input type="radio" value="orange" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} />
          Orange Money
        </label>
        <label>
          <input type="radio" value="card" name="payment" onChange={(e) => setPaymentMethod(e.target.value)} />
          Carte bancaire
        </label>
      </div>

      {paymentMethod === 'wave' || paymentMethod === 'orange' ? (
        <div className="mobile-payment">
          <label>Numéro de téléphone :</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Ex: 77 123 45 67" />
        </div>
      ) : paymentMethod === 'card' ? (
        <div className="card-form">
          <input type="text" placeholder="Numéro de carte" onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})} />
          <input type="text" placeholder="Nom sur la carte" onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})} />
          <input type="text" placeholder="MM/AA" onChange={(e) => setCardInfo({...cardInfo, exp: e.target.value})} />
          <input type="text" placeholder="CVV" onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})} />
        </div>
      ) : null}

      <button className="confirm-button" onClick={handlePayment}>Confirmer le paiement</button>
    </div>
  );
};

export default Checkout;
