const { timeStamp } = require('console');
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url:{require:true,type:String},
    publicId:{require:true,type:String},
    uploadedBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    categroy:{type:String,require:true,
        enum:['Anime','AnimeGirl','Nature','Car','Technology','Manga','Movie','Game','Gooner']
    },
    
    
},{timestamps:true});

module.exports = mongoose.model('Image',imageSchema);

