
const mongoose = require("mongoose");

const { ProductSchema } = require('../Schema/ProductSchema')
const { productCategorySchema } = require('../Schema/ProductCategory')


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
            "ProductCategory": { $in:[ req.query.productCategoryId1,req.query.productCategoryId2]}
        } : {}

        return ProductModel.find({"_id":req.params.productId}).populate('ProductCategory')
        .then(async (res)=>{
            return {status:200, message: res}

        }).catch((err)=>{
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


}
module.exports = new Admin();