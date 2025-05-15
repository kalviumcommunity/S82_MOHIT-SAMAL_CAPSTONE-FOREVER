import React, { useState } from 'react'
import { assets } from '../assets/assets'

import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  
  [/*To store Product Images */]
   const [image1,Setimage1] = useState(false);
   const [image2,Setimage2] = useState(false);
   const [image3,Setimage3] = useState(false);
   const [image4,Setimage4] = useState(false);
   
   [/*To store Product name */]
   const [name,Setname] = useState("");
   
   [/*To store Product description */]
   const [description,Setdescription] = useState("");
   
   [/*To store Product price */]
   const [price,Setprice] = useState("");
   
   [/*To store Product category */]
   const [category,Setcategory] = useState("Men");
   
   [/*To store Product subCategory */]
   const [subCategory,SetsubCategory] = useState("TopWear");
   
   [/*To store Product bestSeller */]
   const [bestSeller,SetbestSeller] = useState(false);
   
   
   [/*To store Product sizes */]
   const [sizes,Setsizes] = useState([]);


   {/*e.preventDefault for stop the page to refresh when we click on submit */}
   const onSubmitHandler = async(e) =>{
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("bestSeller",bestSeller);
      formData.append("sizes",JSON.stringify(sizes)); {/*As sizes are in array so we convert it to string */}
      
       image1 && formData.append("image1",image1);
       image2 && formData.append("image2",image2);
       image3 && formData.append("image3",image3);
       image4 && formData.append("image4",image4);

      {/*To send data to our backend or api call */}
      const response = await axios.post(backendurl+'/api/product/add',formData,{headers:{token : token}} )
      
      {/*Now we will Add the logic of = if the Product is Added then the Poduct input fields will be reset for the new Product */}
      {/*And Get a Toast Success Message */}
      if(response.data.success) {
        toast.success(response.data.message);
        Setname('')
        Setdescription('')
        Setimage1(false)
        Setimage2(false)
        Setimage3(false)
        Setimage4(false)
        Setprice('')
        Setsizes([])
      }
      else{
        toast.error(response.data.message)
      }



    } catch (error) {

      console.log(error);
      toast.error(error.message)
      
    }
   }



   return (
    <div>
      <form onSubmit={onSubmitHandler} className=' flex flex-col w-full items-start gap-3 ' action="">
        <div>
          <p className=' mb-2 ' >Upload Image</p>

          <div className=' flex gap-2 ' >
            

            {/*This ternary operaqator inside the img src is used to change the image upload status to sshow the image when an image is selected  */}
            <label htmlFor="image1">
              <img className='w-20  ' src={!image1 ?assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e) => Setimage1(e.target.files[0])} type="file"  id='image1' hidden />
            </label>

            <label htmlFor="image2">
              <img className='w-20  ' src={!image2 ?assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e) => Setimage2(e.target.files[0])} type="file"  id='image2' hidden />
            </label>

            <label htmlFor="image3">
              <img className='w-20  ' src={!image3 ?assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e) => Setimage3(e.target.files[0])} type="file"  id='image3' hidden />
            </label>

            <label htmlFor="image4">
              <img className='w-20  ' src={!image4 ?assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e) => Setimage4(e.target.files[0])} type="file"  id='image4' hidden />
            </label>


          </div>
        </div>


        <div className='w-full' >
          <p className='mb-2' >Product Name</p>
          <input onChange={(e) => Setname(e.target.value) } value={name} type="text" placeholder='Type here' className='w-full max-w-[500px] px-3 py-2 ' required />
        </div>

        <div className='w-full' >
          <p className='mb-2' >Product Description</p>
          <input onChange={(e) => Setdescription(e.target.value) } value={description} type="textarea" placeholder='Write content here' className='w-full max-w-[500px] px-3 py-2 ' required />
        </div>

    <div className=' flex flex-col sm:flex-row gap-8 w-full sm:gap8  ' >
          <div>
            <p className='mb-2' >Product Category</p>
            <select onChange={(e) => Setcategory(e.target.value) }  className='w-full px-3 py-2 ' name="" id="">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2' >Sub Category</p>
            <select onChange={(e) => SetsubCategory(e.target.value) } className='w-full px-3 py-2 ' name="" id="">
              <option value="TopWear">Top-Wear</option>
              <option value="BottomWear">Bottom-Wear</option>
              <option value="WinterWear">Winter-Wear</option>
            </select>
          </div>


          <div>
            <p className='mb-2' >Product Price</p>
            <input onChange={(e) => Setprice(e.target.value) } value={price} className='w-full px-3 py-1.5 sm:w-[120px] ' type="Number" placeholder='25' />
          </div>
    </div>

        <div>
          <p className='mb-2' >Product Sizes</p>
          <div>
            <div className='flex  gap-3 ' >
              <p onClick={() => Setsizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev,"S"])} className={`${sizes.includes("S") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer  `} >S</p>
              <p onClick={() => Setsizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M"])} className={`${sizes.includes("M") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer  `} >M</p>
              <p onClick={() => Setsizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev,"L"])} className={`${sizes.includes("L") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer  `} >L</p>
              <p onClick={() => Setsizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev,"XL"])} className={`${sizes.includes("XL") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer  `} >XL</p>
              <p onClick={() => Setsizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev,"XXL"])} className={`${sizes.includes("XXL") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer  `} >XXL</p>
            </div>
          </div>
        </div>

        <div className='flex gap-2 mt-2 ' >
          <input onChange={() => SetbestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestseller' />{/*Whenever we select the item it will be selected in bestSeller column */}
          <label className= ' cursor-pointer ' htmlFor="bestseller">Add to BestSeller</label>
        </div>

        <button type='submit' className='w-28 py-3 mt-4 bg-black text-white hover:bg-gray-700 ' >ADD</button>

      </form>
        
    </div>
  )
}

export default Add