import React from 'react'

const NewsLetterbox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
    
  return (
    <div className='text-center' >

        <p className='text-2x1 font-medium text-gray-800 ' >Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3 ' >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo officiis harum numquam optio nemo. 
        </p>
        <p className='text-gray-400 mt-3 ' >Recusandae repellendus atque animi ullam excepturi laborum ducimus aut. Dolores vel mollitia itaque. Accusantium, suscipit eligendi.</p>
        <form onSubmit={onSubmitHandler} action="" className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' >
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Your Email' required/>
            <button type='Submit' className='bg-black text-white text-xs px-10 py-4 '>SUBSCRIBE</button>
        </form>

    </div>
  )
}

export default NewsLetterbox