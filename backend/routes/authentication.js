
const express = require('express')
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const router = express.Router()




router.post('/register', async(req,res)=>{

    const fields= req.body

    if(!fields.firstName || !fields.lastName || !fields.DOB || !fields.address.county || !fields.address.ward || !fields.phoneNumber || !fields.email || !fields.gender || !fields.password){
        res.status(400).json({message: 'Missing fields in input'})
    }

    try{
        const existingUser = await User.findOne({phoneNumber:fields.phoneNumber})

        if(existingUser){
            res.status(400).json({message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(fields.password, 10)

        const newUser = await User.create({...fields, password:hashedPassword})

        res.status(200).json({message: 'User Created Successfully', newUser}).select('-password')
    }
    catch(error){
        console.log('Error creating User',error)
    }


})


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("email", email);
  
    const generateTokens = (userId) => {
      const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Short lived
      });
      
      const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d", // Long lived
      });
      
      return { accessToken, refreshToken };
    };
  
    try {
      const findUser = await User.findOne({ email });
      if (!findUser || !await bcrypt.compare(password, findUser.password)) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }
    catch(error){
      console.log(error)
    }
  
  
  
    if (!email || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }
  
    try {
      const findUser = await User.findOne({email });
      if (!findUser) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      
        
      const { accessToken, refreshToken } = generateTokens(findUser._id);
  
      const isPasswordValid = await bcrypt.compare(password, findUser.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/', 
        maxAge: 60 * 60 * 1000, // 1 hour
      });
  
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/', 
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
  
      res.status(200).json({ message: "Login successful",accessToken,refreshToken });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    }
  });
  

module.exports = router