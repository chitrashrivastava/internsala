
// suthentication ke liye middleware ki need hogi

const jwt=require('jsonwebtoken')
const ErrorHandler=require('../utils/errorHandler') //errhandler isliye need kuki login ni h to errhandler use me aega
const { catchAsyncErrors } = require('./catchAsyncErrors')


exports.isAuthticated=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("please login in to access the resource",401))
    }
    // jwt verify ka kam hota h use decrypt krna
    const {id} = jwt.verify(token,process.env.JWT_SECRET)
    req.id = id;
    
    res.json({id,token})
    
})