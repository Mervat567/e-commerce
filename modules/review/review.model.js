const mongoose=require("mongoose")

//done
let reviewSchema=mongoose.Schema({
   title:String, 
   content:String,
   created_at:Date,
   updated_at:Date,
   user:[{
    type:mongoose.Types.ObjectId,
    ref:"userId"
  }],
})

let reviewModel=mongoose.model("review",reviewSchema)

module.exports=reviewModel