// Products == my plots / rpoperties


import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext';
import { assets } from '../../assets/assets';
import RelatedProduct from './RelatedProduct';


function Products() {

  const {productsId} = useParams();
  const {products,currency,AddToCart} = useContext(ShopContext);
  const [productData,SetproductData] = useState(false);
  const [image,Setimage] = useState('');
  const [size,Setsize] = useState('');

  const fetchproductData = async() => {
    products.map((item)=>{
      if(item._id === productsId){
        SetproductData(item)
        Setimage(item.image[0])

        return null;
      }
    })
  }

  useEffect(() => {
    fetchproductData();
  },[productsId,products])


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/*---------------------Product data----------------------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*----------------------Product Images----------------------*/}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">

          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
                      {
            productData.image.map((item,index) => (
              <img onClick={() => Setimage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            ) )
          }
          </div>

          <div className="w-full sm:w-[80%] ">
            <img className='w-full h-auto' src={image} alt="" />
          </div>

        </div>

        {/* -------------------------Product Info -----------------------------*/}

        <div className="flex-1  ">

          <h1 className='font-medium text-2x1 mt-2'> {productData.name} </h1>
          <div className="flex items-center gap-1 mt-2 ">

            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_dull_icon} alt="" className='w-3 5' />

            <p className='pl-2'>(122)</p>

          </div>

          <p className='mt-5 text-3x1 font-medium'> {currency}{productData.price} </p>
          <p className='mt-5 text-gray-500 md:w-4/5'> {productData.description} </p>

          <div className="flex flex-col gap-4 my-8 ">
            <p>Select Size</p>

            <div className="flex gap-2">
              {productData.sizes.map((item,index) =>(
                <button onClick={() => Setsize(item)} className={`border py-2 px-4 bg-gray-200 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item} </button>
              ) )}
            </div>
          </div>

          <button onClick={() => AddToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>

          <hr className='mt-8 sm:w-4/5' />

          <div className=" text-sm text-gray-500 flex flex-col gap-1 mt-2 ">

            <p>100% Originl Product</p>
            <p>Cash On Delivery is Available on this Product</p>
            <p>Easy Return and Exchange Policy within 7 Days</p>
          </div>

        </div>

      </div>

      {/* --------------------------Description & Review Section-------------------- */}

      <div className="mt-20">
        <div className="flex">
          <b className='border px-5 py-3 text-sm'> Description </b>
          <p className='border px-5 py-3 text-sm'> Reviews(122) </p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolores quas autem omnis veritatis quo porro blanditiis molestias, magni eos sunt, dignissimos qui possimus assumenda accusamus. Nulla quam obcaecati vero.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quae, omnis ad non ut ducimus labore laudantium dolorem blanditiis aut placeat vero, itaque rem molestiae aliquid consectetur quisquam quaerat? Officiis.</p>

        </div>
      </div>

        {/* ------------------------Displaying Related Products atlast------------------------- */}
        <RelatedProduct category={productData.category} subCategory = {productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Products




