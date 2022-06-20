const express = require("express");
const AdminController = require("../Controllers/Admin");

const router = express.Router();

// router.post("/AddProduct",authenticateAdminToken, AdminController.AddProduct);
// router.post("/AddVendor",authenticateAdminToken, AdminController.AddVendor);
// router.post('/SignIn',AuthController.AdminSignIn)
// router.delete("/DeleteProduct",authenticateAdminToken, AdminController.DeleteProduct);
// router.delete("/DeleteVendor",authenticateAdminToken, AdminController.DeleteVendor);
router.post('/AddProduct',AdminController.AddProduct)
router.get('/GetProduct/:productId',AdminController.GetProduct)
router.post('/AddProductCategory',AdminController.AddProductCategory)


module.exports = router;
