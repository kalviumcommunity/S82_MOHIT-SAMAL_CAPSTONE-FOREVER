import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

import { useState,useEffect } from 'react';

function LatestCollections() {
    
    const {products} = useContext(ShopContext);
    const [latestProducts,SetlatestProducts] = useState([]);

    useEffect(() => {
        SetlatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className=' my-10 ' >

        <div className="text-center py-8 text-3xl ">
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 ' >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum, enim sunt deserunt vitae laboriosam neque assumenda optio itaque exercitationem illum dolorem temporibus, ab possimus. In fuga sed ab nemo.
            </p>
        </div>

        {/*Rendering Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">

            {
                latestProducts.map((item,index) => (
                                        <ProductItem id={item._id} image={item.image} name={item.name} price={item.price}key={index}  />
                ))
            }

        </div>

    </div>
  )
}

export default LatestCollections