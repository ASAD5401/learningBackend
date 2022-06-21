
const {SignUpSchema} = require('../Schema/SignUpSchema')
const jwt = require('jsonwebtoken')
const ApiError=require('../Middleware/ApiError')
const e = require('express')
const dotenv = require('dotenv')
const mongoose=require('mongoose')
dotenv.config()

exports.authenticateAdminToken=async (req, res, next) => {
        try{
            const AdminModel=mongoose.model("SignUp",SignUpSchema) 
            const authHeader = req.headers.authorization;
            console.log("authHeader",authHeader)
            const bearer = 'Bearer '
            const token1 =await authHeader && authHeader.split(' ')[1]      
          
            if(!authHeader || !authHeader.startsWith(bearer) || token1==="null"){
               
              return next( ApiError.badRequest('Access denied. No Credentials sent!'));
            }
            const token = authHeader.replace(bearer,'')
            const secretKey = process.env.SECRET_JWT || ""
            console.log("token",token)
            const decoded = jwt.verify(token,secretKey)
            
            const user = await AdminModel.findById(decoded)
            
            if(!user){
                return next(ApiError.unAuthorized('User not authorized'));
                
            }
          
            console.log(user._id.toString())
         
            const ownerAuthorized = req.query.id==user._id.toString()
            if(!ownerAuthorized){
                return next(ApiError.unAuthorized('User not authorized'));
            }
          
            return next()
        }
        
        catch (err){
          
            console.log(err)
            return next(ApiError.internal('Server error'));

        }
    
}

exports.generateAdminAccessToken = (user) => {
 
    return jwt.sign(user.toString(), process.env.SECRET_JWT);
  };
