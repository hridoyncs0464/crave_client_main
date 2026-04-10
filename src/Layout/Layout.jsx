import React from 'react';
import Navbar from '../Component/Header/Navbar';
import { Outlet } from 'react-router';
import CartProvider from '../ContextAPI/CartContext';

const Layout = () => {
    return (
        <CartProvider>
      <Navbar />
      <Outlet />
    </CartProvider>
    );
};

export default Layout;