const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/user-middleware')

router.get('/home',authMiddleware,(req,res)=>{
    const {username,role,userId} = req.userInfo;
    res.json({
        user:{
            _id:userId,
            username,
            role,
        }
    });
});

module.exports = router;