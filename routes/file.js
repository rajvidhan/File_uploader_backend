
const express = require("express");
const router = express.Router();
//pick up the all handlers from controller easily first ..
const {localFileUpload, imageUpload, videoUpload, imageSizeReducer} = require("../controllers/fileUpload")

//mount the routes 
router.post("/localfileupload",localFileUpload);
router.post("/imageupload",imageUpload);
router.post("/videoupload",videoUpload);
router.post("/imagesizreducer",imageSizeReducer)





//export the routers 
module.exports = router;