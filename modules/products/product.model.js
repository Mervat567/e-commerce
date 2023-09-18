const mongoose=require("mongoose")

let productSchema=mongoose.Schema({
   name:{type:String,required:true}, 
   price:{type:Number,required:true},
   desc:{type:String,required:true},
   Image:[{type:Object}],
   category_name:{type:String,required:true}, 

   
})

let productModel=mongoose.model("products",productSchema)

module.exports=productModel