const mongoose = require("mongoose");
const nodemailer  = require("nodemailer");
const fileSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});

//post middleware use 
fileSchema.post("save",async function(doc){
    try{
         //first create transporter
         let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }
         });

         //send email
         let info = await transporter.sendMail({
            from:`vidhan`,
            to:doc.email,
            subject:"New file uploaded on cloudinary ..",
            html:`<h2>Hello  vidhan here </h2><h1>Congratulations 🎉</h1> <p>your file is uploaded brother <br> View here:<a href = "${doc.imageUrl}">${doc.imageUrl}</a></p>`
         });

         console.log("info >",info);



    }catch(err){
        console.log(err);
        
    }
})




module.exports = mongoose.model("File",fileSchema)