const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
let saltrounds=5;

let vendorSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    address:String,
    phone:String,
    role:{
        type:String,
        enum:["superAdmin","admin","premiumUser","user"],
        default:"user"
      },    

})


vendorSchema.pre("save",async function(next){
  this.password=await bcrypt.hash(this.password,saltrounds);
  next();
})

vendorSchema.post("save",async function(){
  console.log(this._id)
})

let vendorModel=mongoose.model("vendor",vendorSchema)
module.exports=vendorModel