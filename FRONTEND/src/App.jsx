import React from 'react'

import { Routes,Route } from 'react-router-dom'

import Home from './Pages/Main/Home'
import Collection from './Pages/Main/Collection'
import Contact from './Pages/Main/Contact'
import About from './Pages/Main/About'
import Products from './Pages/Main/Products'
import Cart from './Pages/Bookings/Cart'
import DisplayOrders from './Pages/Bookings/DisplayOrders'
import Placeorder from './Pages/Bookings/Placeorder'
import Login from './Pages/Singup/Login'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Searchbar from './Components/Searchbar'

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'


import {  ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    const location = useLocation()

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname })
  }, [location])

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px[9vw] '>
      <ToastContainer />
      <Navbar />
      <Searchbar/>

      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path='/Collection' element={<Collection />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/About' element={<About />} />
        <Route path='/Product/:productsId' element={< Products/>} />
        <Route path='/Cart' element={< Cart/>} />
        <Route path='/DisplayOrders' element={<DisplayOrders/>} />
        <Route path='/PlaceOrders' element={<Placeorder/>} />
        <Route path='/login' element={<Login/>} />
        {/* <Routes path='' element={</>} /> */}


      </Routes>

      <Footer/>

    </div>
  )
}

export default App

//https://github.com/kalviumcommunity/S82_MOHIT-SAMAL_CAPSTONE-FOREVER.git