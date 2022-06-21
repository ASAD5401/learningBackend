const AdminModel = require("../Models/Admin");
const ApiError = require("../Middleware/ApiError")

function checkStatus(result,res) {
  if (result.status == 200)
    return res.status(200).send(result.message)
  else if (result.status == 400)
    return next(ApiError.badRequest(result.message));
  else if (result.status == 409)
    return next(ApiError.duplicate(result.message));
    else if (result.status == 403)
      return next(ApiError.unAuthorized(result.message));
  else
    return next(ApiError.internal(result.message));
}

class AdminController {
  AddProduct = async (req, res, next) => {

    const result = await AdminModel.AddProduct(req)
    return (checkStatus(result,res))
   
  }
  GetProduct = async (req, res, next) => {

    const result = await AdminModel.GetProduct(req)

    return (checkStatus(result,res))

  }
  AddProductCategory = async (req, res, next) => {

    const result = await AdminModel.AddProductCategory(req)

    return (checkStatus(result,res))


  }

  SignUp = async (req, res, next) => {

    const result = await AdminModel.SignUp(req)
    return (checkStatus(result,res))

  }
  SignIn = async (req, res, next) => {

    const result = await AdminModel.SignIn(req)
    return (checkStatus(result,res))

  }




}
module.exports = new AdminController();