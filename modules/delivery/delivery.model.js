const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
let saltrounds=5;

//done
let deliverySchema=mongoose.Schema({
  firstName:{type:String, required:true},
  lastName:{type:String, required:true},
   Email:{type:String,required:true},
   Password:{type:String,required:true},
   Address:{type:String,required:true},
   phone:{type:String,required:true},
   vendor:{type:mongoose.Schema.Types.ObjectId},
   role:{
    type:String,
    enum:["superAdmin","admin","premiumUser","user"],
    default:"user"
  },    
})

deliverySchema.pre("save",async function(next){
  this.Password=await bcrypt.hash(this.Password,saltrounds);
  next();
})

deliverySchema.post("save",async function(){
  console.log(this._id)
})


let deliveryModel=mongoose.model("delivery",deliverySchema)

module.exports=deliveryModel