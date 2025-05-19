//We will authenticate the user whenever user will add prodcut to cart or place order or something

const jwt = require('jsonwebtoken');

const authUser = async(req,res,next) => {

    const {token} = req.headers;

    if(!token){
        return res.status(400).json({
            success : false,
            message : "Not Authorized Login Again"
        })
    }

    try {

        //To decode the token
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        // now from this token_decode we will get the id , as we passed that while createing it in the UserController.js
        // Now we will match if the userId == to the token(coded_pass) then allow

        req.userId = token_decode.id
        next();
        
    } catch (error) {
        return res.status(400).status({
            success : false,
            message : "Something went wrong",
            error : error.message
        })
    }


}

module.exports = authUser;