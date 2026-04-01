import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import API from '../../api';
import './ProductList.css';

// Skeleton affiché pendant le chargement
const ProductSkeleton = () => (
  <div className="product-card skeleton">
    <div className="skeleton-img" />
    <div className="skeleton-line" />
    <div className="skeleton-line short" />
  </div>
);

const ProductList = ({ onAddToCart, onRate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);   // ✅ État de chargement
  const scrollerRef = useRef(null);
  const intervalRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err);
      } finally {
        setLoading(false);  // ✅ Toujours désactiver le loader
      }
    };
    fetchProducts();
  }, []);

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

  return (
    <div className="product-list">
      <div
        className="product-scroller"
        ref={scrollerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading
          // ✅ Affiche 6 skeletons pendant le chargement
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={onAddToCart}
                onRate={onRate}
              />
            ))
        }
      </div>
    </div>
  );
};

export default ProductList;