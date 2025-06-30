import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  {/*To manage login and signup */}
  const [currentState, SetcurrentState] = useState('Login'); //Default to login so that after logout it would redirect us to login

  const { token, SetToken, navigate} = useContext(ShopContext);

  const [name, Setname] = useState('');
  const [password, Setpassword] = useState('');
  const [email, Setemail] = useState('');

  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = "http://localhost:9999/auth/google";
  };

   {/*When we Submit the Fields in the login or Sign up it do refresh when we do Siun up or Something */}
    {/*So to prevent that we create a Submit Handler */}
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign up') {

         {/*Sign up Api if the state is Resgistration */}

        const response = await axios.post(`http://localhost:9999/api/user/register`, { name, email, password });

        if (response.data.token) {
          SetToken(response.data.token)
          localStorage.setItem('token', response.data.token);
          toast.success("Signup successful!");
        } else {
          toast.error(response.data.message);
        }

      } else {
        {/*Login Api if the state is Login */}
        const response = await axios.post(`http://localhost:9999/api/user/login`, { email, password });

        if (response.data.token) {
          SetToken(response.data.token)
          localStorage.setItem('token', response.data.token);
          toast.success("Login successful!");
        } else {
          toast.error(response.data.message);
        }
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }
  
  useEffect(() => {
    if(token){
      
      navigate('/');
    }
  },[token])

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

          {/*To Use this at  Sign up and To hide the name input part while login we use this  */}
        {currentState === 'Login' ? '' : (
          <input
            onChange={(e) => Setname(e.target.value)}
            value={name}
            type="text"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Name'
            required
          />
        )}

        <input
          onChange={(e) => Setemail(e.target.value)}
          value={email}
          type="email"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Email'
          required
        />

        <input
          onChange={(e) => Setpassword(e.target.value)}
          value={password}
          type="password"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Password'
          required
        />

        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className='cursor-pointer'>Forgot Password?</p>

         {/*For The option of create account in LOGIN PAGE and Login in SIGN UP  */}
          {
            currentState === 'Login' ?
              <p onClick={() => SetcurrentState('Sign up')} className='cursor-pointer'>Create Account</p> :
              <p onClick={() => SetcurrentState('Login')} className='cursor-pointer'>Login Here</p>
          }
        </div>


        <button className='bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-700  '>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
            <div className="flex flex-col items-center justify-center mt-20">
      <button
        onClick={handleGoogleLogin}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </div>

      </form>
    </div>
  );
}

export default Login;
