const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const studentModel = new mongoose.Schema({
email:{
  unique:true,
type:String,
required:[true,"email is require "]
,match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
password:{
  type:String,
  require:true,
  select:false,
  maxLength:[15,"password should no be exceed more than 15 characters"] ,
  minLength: [6,"password should have 6 characters"],
// match:[] 
}

}
,{timestamps:true});

studentModel.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

studentModel.methods.comparepassword = function(password){
  return bcrypt.compareSync(password,this.password);
}

studentModel.methods.getjwttoken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


const studentdata = mongoose.model("student",studentModel);

module.exports =studentdata;