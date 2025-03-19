import React, { useState, useEffect } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  
  

  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    navigate("/", { state: { message: "You have successfully logged out." } });
  };

  return (
    <div className='flex items-center justify-between py-5 px-10 font-medium'>
      <img src={assets.logo1 } className='w-36' alt="Logo" />
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} className='w-5 cursor-pointer' alt="Search Icon" />
        
        <div className='group relative'>
          <img className='w-5 cursor-pointer min-w-5' src={assets.profile_icon} alt="Profile Icon" />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 py-3 w-36 px-5 bg-slate-100 text-gray-700 rounded'>
              <Link to="/profile" className='cursor-pointer hover:text-black'>My Profile</Link>
              {/* <Link to="/orders" className='cursor-pointer hover:text-black'>Orders</Link> */}
              <p className='cursor-pointer hover:text-black' onClick={handleLogout}>Logout</p>
            </div>
          </div>
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart Icon" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
        </Link>
        <img onClick={() => setVisible(true)} className='w-5 cursor-pointer sm:hidden' src={assets.menu_icon} alt="Menu Icon" />
        <Link to='/login'>
          <img src={assets.login} className='w-5 min-w-5' alt="Login Icon" />
        </Link>
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-grey-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3'>
            <img className='h-4 rotate-180 cursor-pointer' src={assets.dropdown_icon} alt="Back Icon" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
