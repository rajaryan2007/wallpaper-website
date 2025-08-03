require('dotenv').config();
const express = require("express");
const ConnectToDB = require('./database/db')
const app = express();
ConnectToDB();
const PORT=3000;

app.use(express.json());

app.listen(PORT,()=>{
    console.log(`app listing at the port ${PORT}`);
    
});