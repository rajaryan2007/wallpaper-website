const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const registerUser = async (req,res) =>{
    try {
        const {username,email,password,role} = req.body;
        const checkUserExistorNot = await User.findOne({$or:[{username},{email}]});
        if(checkUserExistorNot){
            return res.status(400).json({
                status:false,
                message:'user already exsit try anohter username or email'
            });

        }
        const salt = await bcrypt.genSalt(10);
        const  

    } catch (error) {
        res.status(500).json({
            status:false,
            message:'some error'
        })
        console.error('faild to make user please try again' , error);
        
    }
}