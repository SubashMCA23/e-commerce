import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login"); 
      return;
    }

    console.log("productId:", productId);
    console.log("products:", products);

    if (productId) {
      const selectedProduct = products.find((p) => String(p._id) === String(productId));
      if (selectedProduct) {
        setProduct(selectedProduct);
      } else {
        console.warn("Product not found with ID:", productId);
      }
    }
  }, [productId, products, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); 
      setShowNotification(true);

      
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  if (!product) {
    return (
      <div className="text-center text-xl font-semibold text-red-500 mt-10">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-4">
      {/* Notification Banner */}
      {showNotification && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md z-50">
          <p className="text-sm font-medium">Product added to cart successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            className="w-80 h-80 object-cover rounded-md shadow-lg transform hover:scale-105 transition duration-300"
            src={product.image?.[0] || "default-image-path.jpg"}
            alt={product.name}
          />
        </div>
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-md text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-800">
            Price: ${product.price}
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-md text-lg font-medium shadow-md hover:bg-blue-600 transition duration-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
