const mongoose = require('mongoose')

exports.SignUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
      },
      email: {
        type: String,
        required:true,
      },
    password: {
        type: String,
        required:true,
      },  
},
{
    timestamps:true
}
)

