import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendurl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {


  const [list,Setlist] = useState([]);

  const fetchlist = async() =>{

    try {
      const response = await axios.get(backendurl+'/api/product/list');
      if(response.data.success){

        Setlist(response.data.products)
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }


  const removeProduct = async(id) => {
      try {

        const response = await axios.post(backendurl+'/api/product/remove', {id},{headers : {token}} )
        
        if(response.data.success) {
          toast.success(response.data.message);
         
        {/*So after we remove a list we have to refresh and return the current updated list so for that we call the fetchlist again */}

          await fetchlist(); 
        }
        else{
          toast.error(response.data.message);
        }
        
      } catch (error) {
        console.log(error)
         toast.error(error.message);
        
       }  
  }

  useEffect(() => {
    fetchlist();
  },[])



  
  return (

      <>
        <p className='mb-2' >All Products List</p>
          <div className='flex flex-col gap-2' >




            {/*----------------List Table Title----------------- */}

            <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm bg-gray-200 ' >
              <b className=' ' >Image</b>
              <b className='' >Name</b>
              <b className='' >Category</b>
              <b className='' >Price</b>
              <b className='text-center' >Action</b>
            </div>


            {/*------------------Product List--------------------------------- */}

            {
              list.map((item,index) => (
                <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm '  key={index} >
                  <img className=' w-12 ' src={item.image[0]} alt="" />
                  <p> {item.name} </p>
                  <p> {item.category} </p>
                  <p> {currency}{item.price} </p>
                  <p onClick={() => removeProduct(item._id)} className=' text-right md:text-center cursor-pointer text-2xl  ' > × </p>
                </div>
              ))
            }



          </div>

      </>

  )
}

export default List