const AdminModel = require("../Models/Admin");
const ApiError=require("../Middleware/ApiError")
class AdminController {
    AddProduct = async (req, res, next) => {
  
        const result= await AdminModel.AddProduct(req)  
     
        if(result.status==200)
          return  res.status(200).send(result.message)   
        else if(result.status==400)
          return next( ApiError.badRequest(result.message));
        else if(result.status==409)
          return next( ApiError.duplicate(result.message));
        else
          return next(ApiError.internal(result.message));
     }
     GetProduct = async (req, res, next) => {
  
        const result= await AdminModel.GetProduct(req)  
     
        if(result.status==200)
          return  res.status(200).send(result.message)   
        else if(result.status==400)
          return next( ApiError.badRequest(result.message));
        else if(result.status==409)
          return next( ApiError.duplicate(result.message));
        else
          return next(ApiError.internal(result.message));
     }
     AddProductCategory=async(req,res,next)=>{
  
        const result= await AdminModel.AddProductCategory(req)  
     
        if(result.status==200)
          return  res.status(200).send(result.message)   
        else if(result.status==400)
          return next( ApiError.badRequest(result.message));
        else if(result.status==409)
          return next( ApiError.duplicate(result.message));
        else
          return next(ApiError.internal(result.message));
         
     }
     


     
}
module.exports= new AdminController();