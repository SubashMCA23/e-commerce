import React, { useEffect } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Hero = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message; 

  
  useEffect(() => {
    if (message) {
      
      setTimeout(() => {
        navigate("/", { replace: true }); 
      }, 2000);
    }
  }, [message, navigate]);

  return (
    <div>
      
      {message && (
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md mb-4 text-center mx-auto sm:w-1/2 lg:w-1/4">
          {message}
        </div>
      )}

      <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* Hero Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
          <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
              <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
              <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
            <div className='flex items-center gap-2'>
              <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
              <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
            </div>
          </div>
        </div>

        {/* Hero Right Side */}
        <img className='w-full sm:w-1/2' src={assets.hero_img} alt="Hero Image" />
      </div>
    </div>
  );
};

export default Hero;
