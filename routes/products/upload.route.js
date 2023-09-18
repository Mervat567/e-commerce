let app=require("express").Router()
let uploadController=require("../../controllers/Admin/products.controller")
const {uploadImage}=require("../../helpers/uploader.helper")
const upload=uploadImage("product")

app.put("/image",upload.array('image',1),uploadController.uploadImages)
app.put("/addImage",uploadController.addImagesToArray)

app.delete("/deleteImage",uploadController.deleteImages)
app.delete("/removeImage",uploadController.removeImagesFromArray)

module.exports=app