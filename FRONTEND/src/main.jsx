import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

import ReactGA from 'react-ga4'
ReactGA.initialize('G-VH422JNMQ9') // <-- Use your ID here
ReactGA.send({ hitType: 'pageview', page: window.location.pathname })


import ShopContextProvider from './Context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
  <ShopContextProvider>
          
          <App />

  </ShopContextProvider>

  </BrowserRouter>
)
