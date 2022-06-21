const ApiError = require("./ApiError")

const ApiErrorHandler=(err,req,res,next)=>
{
 

        res.status(err.code).send(err.message);
        return;

}


module.exports = ApiErrorHandler;