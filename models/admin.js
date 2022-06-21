
const mongoose = require("mongoose");
const Bcrypt = require('bcrypt')

const { ProductSchema } = require('../Schema/ProductSchema')
const { productCategorySchema } = require('../Schema/ProductCategory')
const { SignUpSchema } = require('../schema/SignUpSchema')
const { generateAdminAccessToken } = require("../middleWare/AdminMiddleware")

class Admin {
    AddProduct = async (req) => {
        const ProductModel = mongoose.model("Product", ProductSchema)
        const data = new ProductModel(req.body)
        return data.save().then(async (res) => {

            return { status: 200, message: res };


        }).catch((err) => {
            console.log(err)
            if (err._message == "Product validation failed") {
                return { status: 400, message: "Please enter all/valid fields" };
            }
            else if (err.message.includes("duplicate key error collection")) {
                return { status: 409, message: "Duplicate resource" };
            }
            else {
                return { status: 502, message: err };
            }

        })

    };

    GetProduct = async (req) => {
        const ProductModel = mongoose.model("Product", ProductSchema)
        mongoose.model("productcategories", productCategorySchema)
        console.log(req.query.productCategoryId)
        let productCategoryFilter = req.query.productCategoryId1 && req.query.productCategoryId2 ? {
            "ProductCategory": { $in: [req.query.productCategoryId1, req.query.productCategoryId2] }
        } : {}

        return ProductModel.find({ "_id": req.params.productId }).populate('ProductCategory')
            .then(async (res) => {
                return { status: 200, message: res }

            }).catch((err) => {
                console.log(err)
                return { status: 502, message: err };

            })


    };


    AddProductCategory = async (req) => {
        const ProductCategoryModel = mongoose.model("ProductCategory", productCategorySchema)
        const data = new ProductCategoryModel(req.body)
        return data.save().then(async (res) => {

            return { status: 200, message: res };


        }).catch((err) => {
            console.log(err)
            if (err._message == "Product validation failed") {
                return { status: 400, message: "Please enter all/valid fields" };
            }
            else if (err.message.includes("duplicate key error collection")) {
                return { status: 409, message: "Duplicate resource" };
            }
            else {

                return { status: 502, message: err };
            }

        })

    };


    SignUp = async (req) => {
        const SignUpModel = mongoose.model("SignUp", SignUpSchema)
        const finddata = await SignUpModel.findOne({ email: req.body.email })
        if (!finddata) {
            const hashedPassword = Bcrypt.hashSync(req.body.password, 10)
            const body = { ...req.body, password: hashedPassword }
            const data = new SignUpModel(body)
            return data.save().then(async (res) => {

                return { status: 200, message: res };


            }).catch((err) => {
                console.log(err)
                if (err._message == "Product validation failed") {
                    return { status: 400, message: "Please enter all/valid fields" };
                }
                else if (err.message.includes("duplicate key error collection")) {
                    return { status: 409, message: "Duplicate resource" };
                }
                else {

                    return { status: 502, message: err };
                }

            })
        }
        else {
            return { status: 409, message: "Duplicate resource" };

        }




    };


    SignIn = async (req) => {
        const AdminModel = mongoose.model("SignUp", SignUpSchema)
        if (req.body.email && req.body.password) {
            return AdminModel
                .findOne({
                    email: req.body.email
                }).then(async (res) => {
                    if (res) {
                        const isMatch = await Bcrypt.compare(req.body.password, res.password)

                        const accessToken = await generateAdminAccessToken(res._id);

                        if (isMatch) {
                            return { status: 200, message: { res, Token: accessToken } };
                        }
                        else {
                            return { status: 403, message: "Invalid Password" };
                        }

                    }
                    else {
                        return { status: 403, message: "Invalid Contact number" };
                    }

                }).catch(err => {
                    return { status: 500, message: "Server Error" };
                })
        }
        else {
            return { status: 400, message: "Please enter all/valid fields" };
        }

    }

}
module.exports = new Admin();