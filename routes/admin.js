const express = require("express");
const AdminController = require("../Controllers/Admin");
const {authenticateAdminToken}=require('../middleWare/AdminMiddleware')
const router = express.Router();

// router.post("/AddProduct",authenticateAdminToken, AdminController.AddProduct);
// router.post("/AddVendor",authenticateAdminToken, AdminController.AddVendor);
// router.post('/SignIn',AuthController.AdminSignIn)
// router.delete("/DeleteProduct",authenticateAdminToken, AdminController.DeleteProduct);
// router.delete("/DeleteVendor",authenticateAdminToken, AdminController.DeleteVendor);
router.post('/AddProduct',authenticateAdminToken,AdminController.AddProduct)
router.get('/GetProduct/:productId',AdminController.GetProduct)
router.post('/AddProductCategory',AdminController.AddProductCategory)
router.post('/SignUp',AdminController.SignUp)
router.post('/SignIn',AdminController.SignIn)




module.exports = router;
