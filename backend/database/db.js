const mongoose = require("mongoose");

const ConnectToDB = async ()=>{
    try {await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true
    });
    console.log("connect to database sucessfully ");
    
        
    } catch (e) {
        console.error("faild to connect to database",e.message);
        process.exit(1);
        
    }
}

module.exports = ConnectToDB;