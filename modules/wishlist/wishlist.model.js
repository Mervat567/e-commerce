const mongoose=require("mongoose")

//done
let whishListSchema=mongoose.Schema({
   products:[{
    type:mongoose.Types.ObjectId,
     ref:"product"
    }],
   user:{
    type:mongoose.Types.ObjectId,
    ref:"user"
    }, 
})

let whishListModel=mongoose.model("wishlist",whishListSchema)

module.exports=whishListModel