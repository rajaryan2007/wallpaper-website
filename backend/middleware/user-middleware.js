const jwt = require('jsonwebtoken');

const authMiddleware = async (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(400).json({
            status:false,
            message:"no token provided"
        });
    }
    try {
        const decodeTokenInfo = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decodeTokenInfo);
        req.userInfo = decodeTokenInfo;
        next();
        
    } catch (error) {
         return res.status(500).json({
            status:false,
            message:"error"
            
        });
        
    }
    console.log("auth middleware is called ");
    
    

}
module.exports = authMiddleware;