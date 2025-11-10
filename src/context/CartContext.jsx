import React, { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../api/cart";
import { useAuth } from "./authContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const { auth } = useAuth();



  useEffect(() => {
    (async () => {
      if (auth.data) {
        const [data, err] = await getCart();
        if (data) setCart(data);
      }
    })();
  }, [auth]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
