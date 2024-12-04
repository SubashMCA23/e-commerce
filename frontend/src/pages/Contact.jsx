import React from 'react';
import contact_img from '../assets/frontend_assets/contact_img.png'; 

const Contact = () => {
  return (
    <div className="py-10 px-4 sm:px-10 md:px-20 lg:px-40">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="sm:w-1/2">
          <img
            src={contact_img}
            alt="Contact Us"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Contact Form Section */}
        <div className="sm:w-1/2 text-center sm:text-left">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            We'd love to hear from you! If you have any questions or need assistance, feel free to reach out to us. Our team is here to help.
          </p>

          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your message"
                className="w-full p-3 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
