// route hit krne v error-error through krege 
// success hoga to success msg btaega 



exports.catchAsyncErrors = (func) => (req,res,next) =>{
    Promise.resolve(func(req,res,next)).catch(next);
}

// catchasyncmiddleware ki bjh s humari err generate ho rhi h