import React from 'react';
import Navbar from '../Component/Header/Navbar';
import Footer from '../Component/Footer';
import { Outlet } from 'react-router';
import CartProvider from '../ContextAPI/CartContext';

const Layout = () => {
    return (
        <CartProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </CartProvider>
    );
};

export default Layout;