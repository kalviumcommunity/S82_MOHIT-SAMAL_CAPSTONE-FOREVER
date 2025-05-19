//About == About page
//nice

import React from 'react'
import Title from '../../Components/Title'
import { assets } from '../../assets/assets'
import NewsLetterbox from '../../Components/NewsLetterbox'

const About = () => {
  return (
    <div>
      <div className="text-2x1 text-center pt-8 border-t ">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 ">

        <img className='w-full md:max-w-[450px]'  src={assets.about_img} alt="" />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 ' >
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti laudantium eum cupiditate , neque dignissimos atque totam inventore repudiandae animi nihil possimus voluptatem!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>

            <b className='text-gray-600' >Our Mission</b>
            <p> cum nam inventore tempore quos minus!</p>
        </div>

      </div>

      <div className="text-xl py-4 ">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 gap-8 ">
        
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">

          <b>Quality Assurance :</b>
          <p className='text-gray-600' > LORD MOHIT </p>

        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">

          <b>Convenience :</b>
          <p className='text-gray-600' > LORD MOHIT </p>

        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">

          <b>Exceptional Customer Service : </b>
          <p className='text-gray-600' > LORD MOHIT </p>

        </div>
      </div>
        <NewsLetterbox/>
    </div>
  )
}

export default About