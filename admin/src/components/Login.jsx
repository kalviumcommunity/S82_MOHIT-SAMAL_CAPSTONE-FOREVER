import React, { useState } from 'react'
import axios from 'axios';
import { backendurl } from '../App';
import { toast } from 'react-toastify';


const Login = ({SetToken}) => {

    const [email,SetEmail] = useState('');
    const [password,SetPassword] = useState('');

    const onSubmitHandler = async(e) => {
        try {
            e.preventDefault();

            const response = await axios.post(backendurl + '/api/user/adminlogin',{email,password} )
            
            if(response.data.success) {
                SetToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }

        } catch (error) {

            console.log(error)
            toast.error(error.message)
            
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full ' >
        <div className=' bg-white shadow-md rounded-lg px-8 py-6 max-w-md ' > 
            <h1 className='text-2xl font-bold mb-4 ' >Admin Panel</h1>
            <form  onSubmit={onSubmitHandler}  >

                <div className=' mb-3 min-w-72 ' >
                    <p className='text-sm font-medium mb-2 text-gray-700   ' >Email Address</p>
                    <input onChange={(e) =>  SetEmail(e.target.value)} value={email} className=' rounded-md w-full px-3 py-2 border border-gray-300 outline-none ' type="email" placeholder='your@gmail.com' required />
                </div>

                <div className=' mb-3 min-w-72 ' >
                    <p className='text-sm font-medium mb-2 text-gray-700   ' >Password</p>
                    <input onChange={(e) =>  SetPassword(e.target.value)} value={password} className=' rounded-md w-full px-3 py-2 border border-gray-300 outline-none '  type="password" placeholder='Enter Password' required />
                </div>

                <button className=' mt-2 w-full py-2 px-4 text-white bg-black rounded-md hover:bg-gray-700 hover:px-5 hover:py-3 ' type='Submit' >Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login