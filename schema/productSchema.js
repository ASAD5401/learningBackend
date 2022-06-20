const mongoose = require('mongoose')

exports.ProductSchema = new mongoose.Schema({
    Title: {
        type: String,
        required:true,
      },
    Price: {
        type: Number,
        required:true,
      },
    

    ProductCategory: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'productcategories',
    }],
      
},
{
    timestamps:true
}
)

