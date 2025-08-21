// src/components/Navbar/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import '../Navbar/Navbar.css';
import { FaShoppingCart, FaSearch, FaUserLock, FaBars } from 'react-icons/fa';
import logo from '../images/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Navbar = ({ cartCount, setSearchTerm}) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const asideRef = useRef();
  const navigate = useNavigate();

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (asideRef.current && !asideRef.current.contains(event.target)) {
        setIsAsideOpen(false);
      }
    };
    if (isAsideOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAsideOpen]);

const handleAuth = () => {
  if (user) {
    logout();
    navigate('/login', { replace: true });;
  } else {
    navigate('/login');
  }
};

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/allproducts?search=${searchQuery.trim()}`);
      if (setSearchTerm) setSearchTerm(searchQuery.trim());
    }
  };

  return (
    <>

      <nav className="navbar">
        <div className="navbar-left">
           <Link to="/#home"><img src={logo} alt="Logo" className="logo" /></Link>
        </div>

        <div className="navbar-center">
          <div className="search-box">
            <input
              type="text"
              placeholder="Recherche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <div className="navbar-right">
          <Link to="/cart" className="icon-button">
  <FaShoppingCart /> <span>{cartCount}</span>
          </Link>
          {user && (
  <span className="navbar-user">Hello👋{user.name}</span>
)}

{user?.isAdmin && (
  <Link to="/admin" className="icon-button">
    👤
  </Link>
)}
{user ? (
  <button className="icon-button" onClick={handleAuth}>Déconnexion</button>
) : (
  <Link to="/login" className="icon-button">
    <FaUserLock />
  </Link>
)}
          <button className="menu-button" onClick={toggleAside}>
            <FaBars />
          </button>
        </div>
      </nav>

      <div className="header-categories">
        <ul className="categories-list">
          <li className="category-item">
            Biberons
            <ul className="sub-menu">
              <Link to='/allproducts'><li>Biberon Classique</li></Link>
                <Link to='/allproducts'><li>Biberon Anti-colique</li></Link>
            </ul>
          </li>
          <li className="category-item">
            Tétines
            <ul className="sub-menu">
              
              <li>Silicone</li>
              <li>Caoutchouc</li>
            </ul>
          </li>
          <li className="category-item">
            Sucettes
            <ul className="sub-menu">
              <li>Chauffe-biberons</li>
              <li>Goupillons</li>
            </ul>
          </li>
          <li className="category-item">
            Jouets de dentition
            <ul className="sub-menu">
              <li>Chauffe-biberons</li>
              <li>Goupillons</li>
            </ul>
          </li>
          <li className="category-item">
            Toiletries
            <ul className="sub-menu">
              <li>Chauffe-biberons</li>
              <li>Goupillons</li>
            </ul>
          </li>
          <li className="category-item">
            Couches & Lingettes
            <ul className="sub-menu">
              <li>Chauffe-biberons</li>
              <li>Goupillons</li>
            </ul>
          </li>
        </ul>
      </div>

      {isAsideOpen && (
        <aside className="side-menu" ref={asideRef}>
          <div className="menu-content">
            <ul>
              <Link to="/#home"><li>Accueil</li></Link>
              <Link to="/allproducts"><li>Produits</li></Link>
              <a href="/#home"><li>À propos</li></a>
              <a href="#footer"><li>Contact</li></a>
            </ul>
            <div className="auth-button">
                <button onClick={handleAuth}>
                {user ? 'Déconnexion' : 'Connexion / Créer un compte'}
                {user && <p className="aside-user">👋 {user.name}</p>}
                </button>

            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Navbar;
