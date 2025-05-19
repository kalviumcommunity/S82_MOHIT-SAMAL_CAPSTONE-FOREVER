import React, { useContext, useState } from 'react'

import {assets} from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

function Navbar() {

  const [visible, setVisible] = useState(false);

  const {SetshowSearch, getCartCount, navigate,token,SetToken,SetcartItems } = useContext(ShopContext);


  const logout = () => {
    localStorage.removeItem('token')

    // And return to the login page
    navigate('/login')
    
    // When we will Logout then Clear the token
    SetToken('')

    // Clear the cart
    SetcartItems({})

  }

  return (
    <div className='flex items-center justify-between py-5 font-medium '>

       <Link to={'/'} > <img src={assets.logo} className='w-36' alt="image" /></Link>

        <ul className="hidden sm:flex gap-5 text-gray-700 ">
          
          <NavLink to='/' className='flex flex-col items-center gap-1 ' >
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />
          </NavLink>

          <NavLink to='/Collection' className='flex flex-col items-center gap-1 ' >
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />
          </NavLink>

          <NavLink to='/About' className='flex flex-col items-center gap-1 ' >
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />
          </NavLink>

          <NavLink to='/Contact' className='flex flex-col items-center gap-1 ' >
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />
          </NavLink>

        </ul>



        <div className='flex items-center gap-6 '>
           {/* For there Search icon in the header part */}
          <img onClick={() => SetshowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

          <div className='group relative' >

            {/* profile icon */}
            <img  onClick={() => token ? '' : navigate('/login') } src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />

            {/* for drop-down option in profile pic */}
            {/*We used this token && div cause we want to show the dropdown only when we are login and nothing when we are not login  */}
             {token && 
             
             <div className="group-hover:block hidden absolute dropdown-menu  right-0 pt-4 bg-white ">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 brown text-gray-500 rounded ">

                <p className='cursor-pointer hover:text-black '>My Profile</p>
                <p onClick={() =>navigate('/DisplayOrders') } className='cursor-pointer hover:text-black '>Orders</p>
                <p onClick={logout}  className='cursor-pointer hover:text-black '>Logout</p>

              </div>
            </div>}
          </div>

          <Link to='/Cart'  className='relative' >

          {/* cart icon next to profile */}
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />

          {/* For the items count at the bottom  */}
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>

          </Link> 
          
          {/* Menu icon for Mobile Users */}
          <img onClick={() => setVisible(true) } src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden  ' alt="" />

        </div>

     {/* Sidebar Menu for small/Mobile Screen */}
     <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'} `}>

      <div className="flex flex-col text-gray-600 "> 
        <div  onClick={() => {setVisible(false)}} className="flex items-center gap-4 p-3 cursor-pointer ">

          <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
          <p>Back</p>

        </div>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/Home' >HOME</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/Collection' >COLLECTIONS</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/About' >ABOUT</NavLink>
        <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border ' to='/Contact' >CONTACT</NavLink>
      </div>


     </div>

    </div>
  )
}

export default Navbar