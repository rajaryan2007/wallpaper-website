const Image = require('../models/image-modules');
const {uploadFileImage} = require('../helper/cloudinary');
const fs = require(fs);
const cloudinary = require('../config/cloudinary');

const ImageUploadSystem = async(req,res) => {

    try {
         if(!req.file){
        return res.status(500).json({
            status:false,
        message:'faild to upload the image '
        });
    };
    //upload file 
    const {url,publicId} = await uploadFileImage(req.file.path);
    
    //store in mongo data base 
    const newlyUploadImage = new Image({
        url,
        publicId,
        uploadedBy:user.info.userId
    });

    await newlyUploadImage.save();
    
    fs.unlinkSync(req.file.path);

    res.status(200).json({
        status:true,
        message:'image uploaded scussfully'
    })
    } catch (error) {
     res.status(400).json({
            status:false,
            message:'get some error in image uploading'
        });
        
    }

}

const fetchImageController = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(400).json({
            status:false,
            message:'unable to fetch image'
        })
    }
}