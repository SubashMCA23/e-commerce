import React from 'react'
import { Routes,Route, } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MyProfile from './pages/Myprofile'
import Signup from './pages/Signup'


const App = () => {
  return (
    <div className='px-4 sm:px-[5w] md:px-[7w] lg:px-[9w]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about'element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='login' element={<Login/>} />
        <Route path='/profile' element={<MyProfile />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
      
    </div>
  )
}

export default App
