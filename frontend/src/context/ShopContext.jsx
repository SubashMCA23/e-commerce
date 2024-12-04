import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets"; 

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [cart, setCart] = useState([]); 
  const currency = "$";
  const delivery = 10;

  

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Calculate the total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0) + delivery;
  };

  const clearCart = () => {
    setCart([]);
  };

const addToCart = (product) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    alert("Please log in to add items to the cart.");
    return;
  }

  setCart((prevCart) => [...prevCart, product]);
};

  

  const value = {
    products,
    currency,
    delivery,
    cart,
    addToCart,
    removeFromCart,
    getTotalPrice,
    clearCart
    
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
