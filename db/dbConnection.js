const mongoose = require("mongoose");

const dotenv=require("dotenv")
dotenv.config()
// enter your username and password
const uri =  process.env.DATABASE;

exports.MongoConnect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(uri, { useNewUrlParser: true })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
