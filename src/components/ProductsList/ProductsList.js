// src/components/ProductList/ProductList.js
import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import API from '../../api'; // Importez votre instance Axios
import './ProductList.css';

const ProductList = ({  onAddToCart, onRate }) => {
  const [products, setProducts] = useState([]); // Gérer les produits via l'état
  const scrollerRef = useRef(null);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products'); // Requête GET vers votre API produits
        setProducts(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err);
        // Gérer l'erreur, par exemple afficher un message à l'utilisateur
      }
    };
    fetchProducts();
    // ... (logique du setInterval si vous la conservez)
  }, []); // Exécuter une seule fois au montage


  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        if (scrollerRef.current && !isHovered) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
          if (scrollLeft + clientWidth >= scrollWidth) {
            scrollerRef.current.scrollLeft = 0;
          } else {
            scrollerRef.current.scrollLeft += 1;
          }
        }
      }, 20);
    };

    startAutoScroll();
    return () => clearInterval(intervalRef.current);
  }, [isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
     <div className="product-list">
      <div
        className="product-scroller"
        ref={scrollerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {products.map(product => ( // Maintenant 'products' vient de l'état
          <ProductCard
            key={product._id} // Utilisez product._id
            product={product}
            onAddToCart={onAddToCart}
            onRate={onRate}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
