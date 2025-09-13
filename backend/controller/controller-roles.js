const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        const hashedPassword = await bcrypt.hash(password,salt);

        const newlyCreateUser = new User ({
            username,
            password:hashedPassword,
            email,
            role:role||'user'

        });
        await newlyCreateUser.save();
        if(newlyCreateUser){
            res.status(201).json({
                status:true,
                message:'created'
            })
        }
            else{
                res.status(400).json({
                    status:false,
                    message:"failed to create user please try again"
                }); 
            };
        

    } catch (error) {
        res.status(500).json({
            status:false,
            message:'some error'
        })
        console.error('faild to make user please try again' , error);
        
    };
};

const loginUser = async (req,res)=>{
 try {
    const {email,password} = req.body;
    const emailfrom = await User.findOne({email});

    if(!emailfrom){
        return res.status(400).json({
            status:false,
            message:'unable to find ur email'
        });
    }
    const isPasswordMatch = await bcrypt.compare(password,emailfrom.password)
    if(!isPasswordMatch){
        return res.status(400).json({
            status:false,
            message:'incorrect password please try again',
            
            
        });
    };
    const acesstoken = jwt.sign({
        userId:emailfrom._id,
        username:emailfrom.username,
        email:emailfrom.email,
        role:emailfrom.role
    },process.env.JWT_SECRET_KEY,{
        expiresIn:'7d'
    });
    res.cookie(acesstoken,"token",{
        httpOnly:true,
        secure:true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({
        status:true,
        message:'login successfull',
        acesstoken,
        user: {
        email: emailfrom.email,
        role: emailfrom.role,
        username: emailfrom.username,
      },
    });


 } catch (error) {
    res.status(500).json({
            status:false,
            message:'some error'
        });
        console.error('faild to login user please try again' , error);
 };
 

};

const ForChangePassword = async (req,res)=>{
    try {
        const UserId = req.userInfo.userId;

        const {oldPassword,newpassword} = req.body;
        
        const user = await User.findById(UserId);
        if(!user){
            return res.status(400).json({
                status:false,
                message:"unable to find user please try again"
            });
        };
        const isPasswordMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                status:false,
                message:"old password does not match please try again"
            });
        };
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(newpassword,salt);

        user.password = hashedPassword;
        await user.save();
        
        return res.status(201).json({
            status:true,
            message:"password change scessfully"
        });
    } catch (error) {
       res.status(500).json({
            status:false,
            message:'some error'
        });
        console.error('faild to login user please try again' , error);
 };
        
    
};

module.exports = {registerUser,loginUser,ForChangePassword};