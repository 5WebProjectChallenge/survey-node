const authCheck = (req,res,next)=>{
    // can check for auth here 
    next()
}

exports.module = authCheck