/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'

import { Route,Routes } from 'react-router-dom'
import Login from './components/Login'

  import { ToastContainer } from 'react-toastify';

export const backendurl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$'

const App = () => {

     const [token,SetToken] = useState(localStorage.getItem('token') ?localStorage.getItem('token') : '' );


     {/*After login  when we enter refresh it take us to the login page again so to avoid that i used this  useEffect */}

     useEffect(() => {
       localStorage.setItem('token',token)
     },[token])


  return (
    <div className= ' bg-gray-50 min-h-screen ' >
      <ToastContainer/>

      { token === "" ?
      <Login SetToken={SetToken} />

      :

      <>
      <Navbar SetToken={SetToken}  /> {/*Properties to Log Out from Admin Portal */}
      <hr />

      <div className=' flex w-full ' >

        <Sidebar/>

        <div className=' w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base ' >
            
            <Routes>


              <Route path='/add' element={<Add  token={token} />} />
              <Route path='/list' element={<List  token={token} />} />
              <Route path='/orders' element={<Orders  token={token} />} />

               
            </Routes>

        </div>

      </div>
      </>
      }



    </div>
  )
}

export default App