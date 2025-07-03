const orderModel = require("../models/orderModel");
const userModel  = require("../models/userModel");


// Placing Order ussing COD method
const placeOrder = async (req,res) => {

    try {
        
        const {userId,items,amount,address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }
        

        //To save order in DataBase
        const newOrder = new orderModel(orderData);
        await newOrder.save();
         
        //Whenever the order is placed so we have  to reset/clear the user cart so for that
        await userModel.findByIdAndUpdate(userId,{cartData:{}})


        return res.status(200).json({
            success : true,
            message : "Order Placed"
        })

       // To connect this with the frontend go to src/placeOrder.jsx
    } catch (error) {

        console.log(error)
        return res.status(400).json({
            message : error.message
        })
        
    }
    
}


// Placing Order ussing Stripe method
const placeOrderStripe = async (req,res) => {

}


// Placing Order ussing Razorpay method
const placeOrderRazorpay = async (req,res) => {

}



//All Orders Data for Admin Panel
const allorders = async(req,res) => {

    
}


//User Order Data for frontend
const userOrders = async(req,res) => {


}


//update order status from admin panel
const updateStatus = async(req,res) => {


}


module.exports = {placeOrder,placeOrderStripe,placeOrderRazorpay,allorders,userOrders,updateStatus};
