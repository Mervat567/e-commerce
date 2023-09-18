const mongoose=require("mongoose")

let cartSchema=mongoose.Schema({
   products:[{
    _id:{type:mongoose.Types.ObjectId, ref:"products"},
    product:{type:Object},
    quantity:Number, 
    price:Number,
   }],
   total:{type:Number,required:true},

   user:[{
      type:mongoose.Types.ObjectId,
      ref:"users"
     }],
   
   
})

let cartModel=mongoose.model("carts",cartSchema)

module.exports=cartModel