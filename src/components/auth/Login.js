// src/components/auth/Login.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import API from '../../api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/login', credentials);
      login(res.data.user, res.data.token);
      alert('Connexion réussie');
      navigate('/');
    } catch (err) {
      console.error('Erreur complète:', err);
      alert(err.response?.data?.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="auth-container">
      <h2>Se connecter</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          required
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">Se connecter</button>
        <p>Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
      </form>
    </div>
  );
};

export default Login;
