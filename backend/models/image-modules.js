const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url:{require:true,type:String},
    publicId:{require:true,type:String},
    uploadedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    
    
    
},{timestamps:true});

module.exports = mongoose.model('Image',imageSchema);

