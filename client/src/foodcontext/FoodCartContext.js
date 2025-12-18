import React, { createContext, useContext, useMemo, useState } from "react";

const FoodCartContext = createContext(null);

export const FoodCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // [{_id, name, price, imageUrl, quantity}]

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p._id !== id));
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((p) => (p._id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((p) => (p._id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  const totalCost = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQty,
    increaseQty,
    totalCost,
  };

  return (
    <FoodCartContext.Provider value={value}>
      {children}
    </FoodCartContext.Provider>
  );
};

export const useFoodCart = () => useContext(FoodCartContext);
