const express = require("express");
require("dotenv").config({path:'./.env'})
const app = express();

// logger
const logger = require("morgan");
app.use(logger("tiny"));

app.get("/",(req,res,next)=>{
    res.json({message:"homepage"});
})

app.listen(process.env.PORT)

console.log(`Server running on PORT ${process.env.PORT}`)