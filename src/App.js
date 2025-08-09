import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer';
import Home from './components/pages/Home.js';
import Allproduits from './components/AllProducts/AllProducts.js';
import Loader from './components/loader/Loader';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import ContactForm from './components/ContactForm/ContactForm';
import ProductDetails from './components/ProductDetails/ProductDetails.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import ThankYou from './components/checkout/ThankYou';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProducts from './components/admin/AdminProducts';
import AdminOrders from './components/admin/AdminOrders';
import AdminUsers from './components/admin/AdminUsers';
import AdminMessages from './components/admin/AdminMessages';
import AdminUpload from './components/pages/AdminUpload';


const AppContent = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} a été ajouté au panier !`);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

    const clearCart = () => setCart([]);


  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  if (loading) return <Loader />;

  // Masquer Navbar/Footer sur /login et /register
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideLayout && <Navbar cartCount={cart.length} setSearchTerm={setSearchTerm} />}

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/Allproducts" element={<Allproduits searchTerm={searchTerm} addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart cartItems={cart} onRemove={handleRemoveFromCart} />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/checkout" element={<PrivateRoute> <Checkout totalAmount={totalAmount} cartItems={cart}  clearCart={clearCart} /> </PrivateRoute>}/>
        <Route path="/cart" element={<PrivateRoute> <Cart cartItems={cart} onRemove={handleRemoveFromCart} /> </PrivateRoute>}/>
        <Route path="/ContactForm" element={<PrivateRoute>  <ContactForm /> </PrivateRoute>}/>
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/admin" element={<PrivateRoute requireAdmin={true}><AdminDashboard /></PrivateRoute>}>
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="messages" element={<AdminMessages />} />

      </Route>
        <Route path="/admin/upload" element={<AdminUpload />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
