const { catchAsyncErrors } = require("../midddlewares/catchAsyncErrors"); // Corrected spelling
const Student = require("../models/studentModel"); // Changed variable name for model
const {sendtoken}=require('../utils/sendtoken')
const Error=require('../utils/errorHandler')
exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure homepage" });
});

exports.currentUser = catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();

    res.json({student})
})

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    const newStudent = await new Student(req.body).save(); 
    sendtoken(newStudent, 201, res); 
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email }).select('+password').exec();
    
    if (!student || !student.comparepassword(password)) {
        return next(new Error("Invalid email or password", 401));
    }
    sendtoken(student, 200, res); // Assuming 200 is the appropriate status code for successful sign-in
});


exports.studentsignout = catchAsyncErrors(async (req,res,next) =>{
res.clearCookie("token")
res.json({message:"Successfully Signout"})
})
