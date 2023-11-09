const mongoose = require("mongoose");
require("dotenv").config();
exports.connectdb = (req,res)=>{

    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
     console.log("the database is connected successfully brother 🐻‍❄️")
    })
   .catch((err)=>{
    console.log(err);
   })


}