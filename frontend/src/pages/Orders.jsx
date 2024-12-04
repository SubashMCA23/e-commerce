import React from "react";
import { useLocation } from "react-router-dom";

const Orders = () => {
  const location = useLocation();
  console.log("Location state:", location.state); 
  const { cart = [], total = 0 } = location.state || {};

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Placed Successfully!</h1>
      <p className="text-lg text-gray-600 mb-4">
        Thank you for your purchase. Here are your order details:
      </p>
      {cart.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between py-4">
              <span className="text-gray-800 font-medium">{item.name}</span>
              <span className="text-gray-600">{item.price}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found in the order.</p>
      )}
      <h2 className="text-xl font-bold text-gray-800 mt-6">
        Total Paid: {total}
      </h2>
    </div>
  );
};

export default Orders;
