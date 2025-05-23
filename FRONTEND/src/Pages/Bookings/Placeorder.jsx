//PlaceOrders == PLace Bookings

import React, { useContext } from 'react'
import Title from '../../Components/Title'
import TotalCart from './TotalCart'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'

const Placeorder = () => {
  const {navigate,token,cartItems,SetcartItems,getCartAmount,delivery_fee,products} = useContext(ShopContext);
  
  const [method,setMethod] = useState('cod');
  //to save the order details in the DB through COD

  const [formData,SetformData] = useState({
    firstname : '',
    lastname : '',
    email : '',
    street : '',
    city : '',
    state : '',
    pincode : '',
    country : '',
    phone: ''

  })

  //To store value in this variables add onChangeHandler
  const onChangeHandler= (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    SetformData(data => ({...data,[name]:value}) )

  }

  const onSubmithandler = async(e) => {
    e.preventDefault();

    try {

      let orderItems = []

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
             const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo) {
              itemInfo.size = item
              itemInfo.quantity =   cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <form onSubmit={onSubmithandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5
     sm:pt-14 min-h-[80vh] border-t '>
     
     {/*---------------------Left Side---------------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

        <div className='text-x1 sm:text-2xl my-3'>

          <Title text1={'DELIVERY'} text2={'INFORMATION'} />

        </div>

        <div className="flex gap-3">

          <input required onChange={onChangeHandler} name='firstname' value={formData.firstname} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' />
          <input required onChange={onChangeHandler} name='lastname' value={formData.lastname} type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' />

        </div>

          <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email Adress' className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} type="email" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' />

        <div className="flex gap-3">

          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' />

        </div>

        <div className="flex gap-3">

          <input required onChange={onChangeHandler} name='pincode' value={formData.pincode}  type="Number" placeholder='PINCODE' className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' />
          <input required onChange={onChangeHandler} name='country' value={formData.country}  type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' />

        </div>

          <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone. No.' className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' />
      </div>


      {/*---------------------------------Right Side---------------------------- */}

      <div className="mt-8">

        <div className="mt-8 min-w-8">
          <TotalCart/>
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          

          {/*-------------------PAYMENT METHODS----------------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">

            <div onClick={() => setMethod('stripe')} className="flex items-center gap-4 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''} `} ></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div>

            <div onClick={() => setMethod('razorpay')} className="flex items-center gap-4 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''} `} ></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
            </div>

            <div onClick={() => setMethod('cod')} className="flex items-center gap-4 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''} `} ></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>

          </div>

          <div className="w-full text-end mt-8">
            <button type='submit' onClick={() => navigate('/DisplayOrders')} className='bg-black text-white px-16 py-3 text-sm rounded' >PLACE ORDER</button>
          </div>
        </div>

      </div>
    </form>

  )
}

export default Placeorder