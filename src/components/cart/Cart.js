// src/components/Cart/Cart.js
import React from 'react';
import './Cart.css'
import { useNavigate } from 'react-router-dom';


const Cart = ({ cartItems, onRemove }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h2>Mon Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.price} FCFA</p>
                  <button onClick={() => onRemove(index)}>Supprimer</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total : {total} FCFA</h3>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>Passer au paiement</button>
        </>
      )}
    </div>
  );
};

export default Cart;
