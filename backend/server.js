require('dotenv').config();
const express = require('express');
const ConnectToDB = require('./database/db');
const authRoutes = require('./routes/user');
const adminPage = require('./routes/admin-routes');
const homePage = require('./routes/home-routes');
const imageRoutes = require("./routes/image-routes")
const cors = require("cors")
const app = express();
ConnectToDB();
const PORT=3000; 
app.use(cors({
  origin: "https://wallpaper-website-1nqz.vercel.app","http://localhost:5173",
   
  credentials: true
}));
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/add',adminPage);
app.use('/api/home',homePage);
app.use('/api/image',imageRoutes);
app.listen(PORT,()=>{
    console.log(`app listing at the port ${PORT}`);
    
});
