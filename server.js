const express = require("express");
const app = express();
const cors = require("cors");
const db=require('./db/dbConnection')
const apiErrorHandler = require("./middleWare/ApiErrorHandler");
const AdminRouter=require("./routes/admin");


app.use(express.json());
app.use(cors());
app.get('/gettext',async(req,res)=>
{
  const result=await GlobalFunctions.updateRefund(req)
  if(result.status==200)
  {
      res.status(result.status).send(result.message)
  }
})
app.get("/SendMail",(req,res)=>
{
  GlobalFunctions.SendMail1()
})
app.use("/Admin",AdminRouter)
app.use(apiErrorHandler)
const port = process.env.PORT || 3001;
db.MongoConnect().then((result) => {
    app.listen(port,()=>{
        console.log(`Server is up and running on port: ${port}`)
    })
  });
