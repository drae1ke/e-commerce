import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';
import Category from './pages/Category';
import Login from './pages/Login';
import Order from './pages/Orders';
import Footer from './components/Footer';
import accesories from './assets/accesories_banner.jpg'
import laptop from './assets/laptop_banner.jpg'
import phone from './assets/phone_banner.jpg'
import Signup from './pages/Signup'

function App() {


  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/computers" element={<Category banner ={laptop}  category = "computer" />} />
        <Route path="/phones" element={<Category banner ={phone} category ="phone" />} />
        <Route path="/accesories" element={<Category banner ={accesories}  category = "accessory"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />
      </Routes>
        <Footer/>
    </BrowserRouter>

    </>
  );
}

export default App;
