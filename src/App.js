import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from "./components/checkout";
import Footer from './components/Footer';
import { CartProvider } from "./context/CartContext";
import ProductDetail from './pages/ProductDetail'; // اضافه کردن صفحه جزئیات محصول
import { useAuth } from "./context/AuthContext";


  


function App() {
  const { user } = useAuth();
  return (
    <CartProvider>
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* هدر یا منوی ناوبری */}
        <Navbar />

        {/* بخش اصلی صفحات */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} /> {/* مسیری برای صفحه جزئیات محصول */}
          </Routes>
        </main>

        {/* فوتر */}
        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
