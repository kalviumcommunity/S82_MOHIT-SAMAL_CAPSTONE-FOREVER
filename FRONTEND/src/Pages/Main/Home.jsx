// Home == Main page


import React from 'react'
import Hero from '../../Components/Hero'
import LatestCollections from '../../Components/LatestCollections'
import BestSeller from '../../Components/BestSeller'
import OurPolicy from '../../Components/OurPolicy'
import NewsLetterbox from '../../Components/NewsLetterbox'

function Home() {
  return (
    <div>
        <Hero/>
        <LatestCollections/>
        <BestSeller/>
        <OurPolicy/>
        <NewsLetterbox/>
    </div>
  )
}

export default Home