// 

exports.generatedErrors = (err,req,res,next) =>{
    const statusCode = err.statusCode || 500;


    // user pad sake error ko easily
  if(err.name ==="MongoServerError" && err.message.includes("E1000 duplicate key")){
    err.message = "student with this email address already exists"
  }

    // yha se humara err msg show ho rha h
    res.status(statusCode).json({
        message:err.message,
        errName: err.name,
        // stack:err.stack,
    });
};