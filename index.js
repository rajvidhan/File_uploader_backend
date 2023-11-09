const express = require("express")
require("dotenv").config();
const app = express();
//middleare 
app.use(express.json());
//this is a file upload middleware which is use for pload the files on the server ..
const fileupload = require("express-fileupload")
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
//connnection of database brother 
require("./config/database").connectdb();
//cloudinary se connect krna hai ab..
require("./config/cloudinary").cloudinaryConnect();
//define routes
const routes = require("./routes/file")
app.use("/api/v1",routes);
//listen the server carefully brother ..
app.listen(process.env.PORT,()=>{
    console.log("the surver is running well brother..💃");
})