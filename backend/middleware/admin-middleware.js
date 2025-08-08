const isadminUser = (req,res,next) =>{
    if(req.userInfo.role !== 'admin'){
         return res.json({
            status:true,
            message:"u don't have a permisson to admin page",
        });
    }
    next();
} 
module.exports = isadminUser;