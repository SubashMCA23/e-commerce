import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Cart = () => {
  const { cart, removeFromCart, currency, getTotalPrice, clearCart } =
    useContext(ShopContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/cart"); 
    }
  }, [navigate]);

  const handlePlaceOrder = () => {
    console.log("Cart data being passed:", cart);
    console.log("Total price being passed:", getTotalPrice());

    
    navigate("/orders", {
      state: {
        cart,
        total: getTotalPrice(),
      },
    });

    
    clearCart();
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600 mt-4 text-lg">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md shadow"
                  />
                  <div>
                    <p className="text-lg font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {currency}
                      {item.price}
                    </p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => removeFromCart(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Total: {currency}
              {getTotalPrice()}
            </h2>
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
