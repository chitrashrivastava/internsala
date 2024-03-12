const nodemailer = require("nodemailer")

exports.sendmail = (req,res,next,url)=>{
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        post:465,
        auth:{
            // jo v company  mail bhej rha hoga uaka mail yha hoga
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD,
        }
    })
    const mailOptions = {
        from:"DEEP Pvt. ltd.<deep@gamil.com>",
        to: req.body.email,
        subject:"password reset link",
        // "text",donot share this lik wt anyone
        html: `<h1>Click link below to reset password</h1>
        <a href="${url}">password reset link </a>`

    };


  transport.sendMail(mailOptions,(err,info)=>{
    if(err)  return next(
        new errorHandler(err,500));
        console.log(info);
        return  res.status(200).json({
            message: "mail sent successfully",
            url,
        })
  })
};
