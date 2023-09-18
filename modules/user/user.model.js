const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
let saltrounds=5;
//done
let userSchema=mongoose.Schema({
     firstName:{type:String, required:true},
     lastName:{type:String, required:true},
      Email:{type:String, required:true},
      Password:{type:String,required:true},
      Address:{type:String,required:true},
      phone:{type:String,required:true},
      role:{
        type:String,
        enum:["superAdmin","admin","premiumUser","user"],
        default:"user"
      },    
})

userSchema.pre("save",async function(next){
  this.Password=await bcrypt.hash(this.Password,saltrounds);
  next();
})

userSchema.post("save",async function(){
  console.log(this._id)
})



let userModel=mongoose.model("users",userSchema)

module.exports=userModel