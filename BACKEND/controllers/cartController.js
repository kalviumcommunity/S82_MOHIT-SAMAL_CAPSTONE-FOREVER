// Add products to User cart so that it would save in monogBD

const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
    try {
        const { itemId, size} = req.body;
        const userId = req.userId; // ✅ from middleware

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData || {}; // in case it's undefined

        if (cartData[itemId]) {
            if (cartData[itemId][size] ) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }


        await userModel.findByIdAndUpdate(userId, { cartData });

        return res.status(200).json({
            success: true,
            message: "Added to cart"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};



// Update User cart 

const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userId = req.userId;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            cartData[itemId][size] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        return res.status(200).json({
            success: true,
            message: "Updated the cart"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

// Get User cart

const getUserCart = async(req,res) => {
    try {
        const {userId} = req.body;
        
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        return res.status(200).json({
            success :true,
            cartData
        })



    } catch (error) {
        
        return res.status(400).json({
            success : false,
            message : "Something went wrong",
            error:error.message
        })
    }

}

module.exports = {addToCart,updateCart,getUserCart};

//Created Routes for these in ROUTES => named cartRoute.js