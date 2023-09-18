const mongoose=require("mongoose")
//done
let orderSchema=mongoose.Schema({
   r_time:Date, 
   a_time:Date,
   products:[{
   id:{type:mongoose.Schema.Types.ObjectId},
      quantity:Number,
   }],
   user:[{
   id:mongoose.Schema.Types.ObjectId,
    firstName:String,
    lastName:String,
     Email:String,
     Password:String,
      Address:String,
   }],
   delivery:{type:mongoose.Schema.Types.ObjectId}
})

let orderModel=mongoose.model("order",orderSchema)

module.exports=orderModel