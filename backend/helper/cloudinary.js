const cloudinary = require('../config/cloudinary')

const uploadFileImage = async(filePath)=>{
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return ({
            url:result.secure_url,
            publicId:result.public_id
        })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {uploadFileImage};