// Logic to allow User to Create or Login in the website

const UserSchema = require('../models/userModel.js');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const createToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET)
}




// Routes => Logic for User Login
const loginUser = async (req, res) => {
  try {

    const {email,password} = req.body;

    const user = await UserSchema.findOne({email});

    if(!user){
      return res.status(404).json({
        success : false,
        message : "User Doesn't Exists"
      })
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(isMatch){

      const token = createToken(user._id);
      return res.status(200).json({
        success:true,
        token
      })
    }
    else{
        return res.status(400).json({
          success : false,
          message : "Invalid Credentials"
        })
    }
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success : false,
      message : error.message
    })
    
  }
};

// Routes => Logic for User Registration
const registerUser = async (req, res) => {
    try {

        const {name,email,password} = req.body;

        //User Already Existe or User Already with that email id
        const existUser = await UserSchema.findOne({email});

        if(existUser) {
          return res.status(400).json({
            success:false,
            message : "User already exists"
          })
        }

        // Validating email format & strong password
        if(!validator.isEmail(email)) {
          return res.status(400).json({
            success:false,
            message :"Please enter a valid email"
          })
        }

        if(password.length < 8){
          return res.status(400).json({
            success:false,
            message : "Password is too Short ,Please enter a strong password"
          })
        }

        // Hashinng User password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new UserSchema({name,email,password:hashedPassword});
        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({success:true,token})


    } catch (error) {
        console.log(error);
        return res.status(400).json({
          success : false,
          message : error.message
        })
      }
    };
    
    // Routes => Admin Login
    const Adminlogin = async (req, res) => {
      try {

        const {email,password} = req.body;

        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASS){
          const token = jwt.sign(email+password,process.env.JWT_SECRET);

          return res.status(200).json({
            success : true,
            token
          })

        }
        else{
          return res.status(400).json({
            success : false,
            message : 'Invalid Credentials'
          })
          
        }
        
      } catch (error) {
    console.log(error);
    return res.status(400).json({
      success : false,
      message : error.message
    })
    
  }
};

module.exports = { loginUser, registerUser, Adminlogin };
