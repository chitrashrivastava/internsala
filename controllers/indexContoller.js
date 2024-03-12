const { catchAsyncErrors } = require("../midddlewares/catchAsyncErrors"); // Corrected spelling
const Student = require("../models/studentModel"); // Changed variable name for model
const {sendtoken}=require('../utils/sendtoken')
const Error=require('../utils/errorHandler');
const { sendmail } = require("../utils/nodemailer");


// routes started
// 
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

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
     const student = await Student.findOne({email: req.body.email}).exec()
   

    // agr student to err generate krni hogi 
    if(!student)
    return next(
new errorHandler("user not found with this email address",404)
)

// apna domain nikal lete h
const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;
sendmail(req,res,next,url);

// nodemailer - is used sent mail

res.json({student,url});
});