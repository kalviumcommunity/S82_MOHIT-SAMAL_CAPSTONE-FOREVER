import { createContext, useEffect, useState } from "react";
import axios from 'axios';

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    // Currency can be changed by changing the symbol for the whole page
    const currency = '$';
    const delivery_fee = 50;

//     //------------optional
//     export function formatPriceINR(price) {
//   if (!price) return "₹0";
//   return "₹" + Number(price).toLocaleString("en-IN");
// }
// 📄 Use it inside a product card or order list:

// jsx
// Copy
// Edit
// import { formatPriceINR } from "../utils/formatPrice";

// <span>{formatPriceINR(product.price)}</span>
    //------------optional

    const backendurl = import.meta.env.VITE_BACKEND_URL

    const [search,Setsearch] = useState('');
    const [showSearch,SetshowSearch] = useState(false);
    const [cartItems,SetcartItems] = useState({});
    const navigate = useNavigate();

    const [products,Setproducts] = useState([]);
    const [token,SetToken] = useState("");


    const AddToCart = async(itemId,size) => {

        if(!size){
            toast.error('Select Product Size');
            return;
        }
            let cartData = structuredClone(cartItems);

          if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
          }
          else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
          }
          SetcartItems(cartData)
   

          //Our product will be added to Database whenever we are login
if (token) {
  try {
    await axios.post(
      'http://localhost:9999/api/cart/add',
      { itemId, size },
      { headers: { token } }
    );
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to add to cart");
    console.log(error);
  }
}
    }
    
    const getCartCount = () => {
                let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                    
                } catch (error) {
                     toast.error(error.message);
                     console.error(error.message);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async(itemId,size,quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        SetcartItems(cartData)

        //If we update any quantity of product that will update in the database

        if(token){
            try {
                await axios.post('http://localhost:9999/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
        
    }

    
    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0 && itemInfo ){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    
                    toast.error("Something went wrong while calculating total!");
                    console.error(error.message);
                }
            }
        }
        return totalAmount;
    }
    
    const getProductsData = async() => {
        try {

            const response = await axios.get('http://localhost:9999/api/product/list')

            if (response.data.success) {
                Setproducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        
        
    }
    //When ever we reload the data data reset , but we want the original what it is in the Database

    const getUserCart = async(token) => {
        try {
            const response = await axios.post('http://localhost:9999/api/cart/update',{headers:{token}})

            if(response.data.success){
                SetcartItems(response.data.cartData)
            }
        } catch (error) {
            
    console.log(error);
    toast.error(error.message)
        }
    }
    // Now to run this function whenever the website is refreshed in The useEffect
    useEffect(() => {
        getProductsData();
    },[products])



    {/*When we log in and refresh the page it again asks us to sign in , instead of showing login or what so to prevent that */}
    useEffect(() => {
        if(!token && localStorage.getItem('token')) {
            SetToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])


    const value = {
        products,currency,delivery_fee,search,Setsearch,showSearch,SetshowSearch,cartItems,AddToCart,
        getCartCount,updateQuantity,getCartAmount,navigate,backendurl,SetToken,token
    }

    return(

        <ShopContext.Provider value={value} >
            {props.children}
        </ShopContext.Provider>


    )

}

export default ShopContextProvider;