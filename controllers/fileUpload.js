const File = require("../models/File");
const cloudinary = require("cloudinary").v2


exports.localFileUpload = (req,res)=>{
try{
//fatch the file 
const file = req.files.file;
console.log("file yha hai > ", file);


//path where the file is going to be upload 
let path = __dirname +"/files/"+ Date.now() + `.${file.name.split('.')[1]}`;
console.log("the path is >",path);


// move funtion of file which is move the file on the path
file.mv(path,(err)=>{
    console.log(err);
});


//response
res.json({
    success:true,
    msg:"this file is uploaded successfully..."
})


}catch(err){
    console.log("error is happen during the file upload")
    console.log(err);
}
}
//this function is work for validation of imagetype 
function isfiletypesupported(type,supportedtypes){   
    return supportedtypes.includes(type);
}
//this function is use to upload the image on cloudinary 
async function uploadfiletocloudinary(file,folder,quality){
   
    const options = {folder};
    options.resource_type = "auto";
    if(quality){
        options.quality = quality;
    }
  return await cloudinary.uploader.upload(file.tempFilePath,options);
}
//image upload ka handler
exports.imageUpload=async (req,res)=>{
try{
//data fatch is done 
const {name,tags,email} = req.body;


const file = req.files.imagefile;


//validation is done 
const supportedtypes = ["jpg","jpeg","png"];
const filetype = file.name.split('.')[1].toLowerCase();

if(!isfiletypesupported(filetype,supportedtypes)){
    return res.json({
        status:false,
        msg:"file type is not supported brother .."
    })
}

// file formate supported hai ab ?..
const response = await uploadfiletocloudinary(file,"Vidhan");
console.log("response is > ",response);



// db main entry save krna hai 
const filedata = await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url  
});

    res.json({
        status:true,
        url :response.secure_url  ,
        msg:"image successfully uploaded brother"
    })




}catch(err){
   
    console.log(err);
    res.json({
        status:false,

        msg:"something went wrong brother "
    })
  
}
}
exports.videoUpload=async (req,res)=>{
    try{
        //1. fatch the data 
  const file = req.files.videofile;
  const {name,email,tags} = req.body ;
   
//2. validation
const supportedtypes =["mp4","mov"];
const filetype = file.name.split('.')[1].toLowerCase();

if(!isfiletypesupported(filetype,supportedtypes)){
    return res.json({
        status:false,
        msg:"file type is not supported brother .."
    })
}

//3.file formate supported hai ab ?..
const response = await uploadfiletocloudinary(file,"Vidhan");
console.log("response is >",response);



// 4.db main entry save krna hai 
const filedata = File.create({
    name,
    email,
    tags,
    imageUrl: response.secure_url

}) 

//5. response send krna 
res.json({
    status:true,
    msg:"video uploaded successfully"
})

    }catch(err){
        console.log(err);
         res.json({
               status:false,
               msg:"something went wrong brother "
    })
    }
}
//handler for imagesize reducer 
exports.imageSizeReducer= async (req,res)=>{
    try{
        const {name,tags,email} = req.body;


        const file = req.files.imagefile;
        
        
        //validation is done 
        const supportedtypes = ["jpg","jpeg","png"];
        const filetype = file.name.split('.')[1].toLowerCase();
        
        if(!isfiletypesupported(filetype,supportedtypes)){
            return res.json({
                status:false,
                msg:"file type is not supported brother .."
            })
        }
        
        // file formate supported hai ab ?..
        const response = await uploadfiletocloudinary(file,"Vidhan",30);
        console.log("response is > ",response);
        
        
        
        // db main entry save krna hai 
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url  
        });
        
            res.json({
                status:true,
                url :response.secure_url  ,
                msg:"image successfully uploaded brother"
            })
        
        
        


    }catch(err){
        console.log(err);
        res.json({
            status:false,
            msg:"something went wrong brother ..."
        })
    }
}
