const { error } = require('console');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"upload/");
    },filename:function(req,res,cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const checkFileFilter = (req,file,cb)=>{
 if(file.mimetype.startsWith('image')){
    cb(null,true)
 }else{
    cb(new Error("not an image please upload only image "))
 }

};
module.exports = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});
