const mongoose = require('mongoose')

exports.productCategorySchema = new mongoose.Schema({
    Category: {
        type: String,
        required:true,
      },
    OrganizationName: {
        type: String,
        required:true,
      },
    


      
},
{
    timestamps:true
}
)

