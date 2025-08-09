// src/components/auth/Register.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import API from '../../api';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/register', user);
      // on passe par le context pour mémoriser user + token
      login(res.data.user, res.data.token);
      alert('Inscription réussie');
      navigate('/');
    } catch (err) {
      console.error('Erreur complète:', err);
      alert(err.response?.data?.message || "Erreur lors de l’inscription");
    }
  };

  return (
    <div className="auth-container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nom complet"
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">S'inscrire</button>
        <p>Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
      </form>
    </div>
  );
};

export default Register;
