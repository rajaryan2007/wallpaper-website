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
        const page = parseInt(req.query.page)||1;
        const limit = parseInt(req.query.limit)||5;
        const skip = (page = -1)*limit;

        const sortBy =  req.query.sortBy||'createdAt'
        const sortOrder = req.query.sortOrder==='asc'?1:-1;
        const imageTotal = await Image.countDocuments();
        const totalPage = Math.ceil(imageTotal/limit);
        
        const sortObj = {};
        sortObj[sortBy]=sortOrder;
        
        const image = await image.find().sort(sortObj).skip(skip).limit(limit);
        if(image){
            res.status(200).json({
                success:true,
                totalPage:totalPage,
                imagetotal:imageTotal,
                currentPage:page,
                data:Image
            });
        };

    } catch (error) {
        res.status(400).json({
            status:false,
            message:'unable to fetch image'
        })
    }



}

const deleteImagefromDB = async (req,res)=>{
    try{
    const IdOfImage = req.params.id
    const Image = await Image.findById(IdOfImage) 
    if(!Image){
        return res.status(400).json({
            status:false,
            message:"unable to find image in DB"
            
        });
    }
    await cloudinary.uploader.destroy(Image.publicId);
    await Image.findByIdAndDelete(IdOfImage)
res.status(200).json({
    success:true,
    message:"image delte form DB"
})

}catch(e){
    console.log("some error to delete the image",e);
    res.status(500).json({
        success:false,
        message:"some error occured"
    })
    
}
}



const fetchSingleImage = async (req, res) => {
  try {
    const singleImageId = req.params.id;

    if (!singleImageId) {
      return res.status(400).json({
        success: false,
        message: "Image ID is required",
      });
    }

    // find image in DB
    const singleImage = await Image.findById(singleImageId);

    if (!singleImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Cloudinary public_id should be stored in DB when you upload the image
    const downloadUrl = cloudinary.url(singleImage.publicId, {
      flags: "attachment:" + (singleImage.filename || "download.jpg"), // force download
      fetch_format: "auto",
      quality: "auto",
    });

    return res.status(200).json({
      success: true,
      image: singleImage,
      downloadUrl, //  send the download link
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Some error occurred while fetching the image",
    });
  }
};

module.exports ={ImageUploadSystem,fetchImageController,deleteImagefromDB,fetchSingleImage}