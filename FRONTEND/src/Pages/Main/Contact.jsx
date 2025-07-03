//Contact == Contact page


import React from 'react'
import Title from '../../Components/Title'
import { assets } from '../../assets/assets'
import NewsLetterbox from '../../Components/NewsLetterbox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTEACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 ">

        <img  className='w-full md:max-w-[480px] ' src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6 ">
          <p className='font-semibold text-xl text-gray-600' > Our Store </p>
          <p className='text-gray-500' > 500078 AWAL STATS <br /> Suite 350, HYDERABAD, INDIA  </p>
          <p className='text-gray-500' > Tel: (415) 999-1597 <br />Email: admin@Forever.in </p>
          <p className='text-gray-600 font-semibold text-xl ' >Careers at Forever</p>
          <p className='text-gray-500' > Learn More about Our Teams and Job Openings </p>

          <button className='border border-black px-8 py-4 text-sm hover:bg-black transition-all hover:text-white  duration-500' >Explore Jobs</button>
        </div>

      </div>
      <NewsLetterbox/>
    </div>
  )
}

export default Contact