import React from 'react';
import about_img from '../assets/frontend_assets/about_img.png'; 

const About = () => {
  return (
    <div className="py-10 px-4 sm:px-10 md:px-20 lg:px-40">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="sm:w-1/2">
          <img
            src={about_img}
            alt="About Us"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Content Section */}
        <div className="sm:w-1/2 text-center sm:text-left">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Welcome to our store! We are passionate about bringing you the best products
            that combine quality, style, and value. Our mission is to provide an exceptional
            shopping experience, ensuring that every customer finds exactly what they’re looking for.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            From carefully curated collections to unparalleled customer service, we strive
            to exceed your expectations every step of the way. Whether you're shopping for
            the latest trends, timeless essentials, or unique gifts, we’re here to make your
            journey enjoyable and inspiring.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            Thank you for choosing us. Together, let’s celebrate the joy of discovering
            products that make life more vibrant and meaningful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
