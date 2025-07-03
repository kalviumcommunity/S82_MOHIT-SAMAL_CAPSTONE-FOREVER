const express = require('express')

const {placeOrder,placeOrderStripe,placeOrderRazorpay,allorders,userOrders,updateStatus}  = require('../controllers/orderController.js')
const adminauth = require('../middleware/adminauth.js');
const authUser = require('../middleware/auth.js')

const orderRouter = express.Router();


//Admin features;
orderRouter.post('./list',adminauth,allorders);
orderRouter.post('./status',adminauth,allorders);

//Payment feautures;
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

//User Feature;
orderRouter.post('/userorders',authUser,userOrders)


module.exports = orderRouter;