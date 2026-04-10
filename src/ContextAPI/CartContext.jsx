import { createContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [searchParams] = useSearchParams();

  // Read table number from URL: ?table=5
  const tableNumber = searchParams.get("table") || null;

  // Persist cart in sessionStorage so it survives page refresh
  useEffect(() => {
    const saved = sessionStorage.getItem("crave_cart");
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("crave_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        // Already in cart — increase quantity
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    sessionStorage.removeItem("crave_cart");
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const cartTotal = cartItems.reduce(
    (sum, i) => sum + i.price_bdt * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        tableNumber,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;