const ApiError = require("./ApiError")

const ApiErrorHandler=(err,req,res,next)=>
{
 
    if (err instanceof ApiError)
    {
        res.status(err.code).send(err.message);
        return;
    }

    res.status(502).json('server error')
}


module.exports = ApiErrorHandler;