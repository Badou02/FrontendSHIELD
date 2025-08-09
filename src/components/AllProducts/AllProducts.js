import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import './AllProducts.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AllProducts = ({ onAddToCart }) => {
  const query = useQuery();
  const searchParam = query.get('search') || '';

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParam);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        alert('Erreur lors du chargement des produits');
      }
    };
    fetchProducts();
  }, []);

  const handleRate = async (id, stars) => {
    try {
      await API.post(`/products/${id}/rate`, { stars });
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la notation');
    }
  };

  const groupedProducts = products.reduce((groups, product) => {
    const cat = product.category || 'Autres';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(product);
    return groups;
  }, {});

  return (
    <div className="all-products-page">
      <h2>Nos Produits</h2>
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {Object.keys(groupedProducts).map((category) => {
        const filtered = groupedProducts[category].filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filtered.length === 0) return null;

        return (
          <div key={category} className="category-section">
            <h3>{category}</h3>
            <div className="products-flex-container">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onRate={handleRate}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllProducts;
