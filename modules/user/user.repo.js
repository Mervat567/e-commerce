const User = require("./user.model");
const bcrypt=require("bcrypt")


exports.isExist = async (filter) => {
  try{
  let user = await User.findOne(filter);
  if (user) {
    return {
      code: 200,
      record: user,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "user is not found",
    };
  }
}catch(error){
 console.log("error"+error.message)
 return{
  success:false,
  code:500,
  error:"unexpected error"
 }
}
};

exports.list = async (filter) => {
  try{
  let records = await User.find(filter).select("-password");
  return {
    code: 200,
    records,
    success: true,
  };
}catch(error){
  console.log("error"+error.message)
 return{
  success:false,
  code:500,
  error:"unexpected error"
 }
}
};

exports.create = async (form) => {
  try{
  let user = await this.isExist({email:form.Email});
  if (!user.success) {
    const newUser = new User(form);
    await newUser.save();
    return {
      success: true,
      code: 200,
      record: newUser,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "User already exists",
    };
  }
}catch(error){
  console.log("error"+error.message)
 return{
  success:false,
  code:500,
  error:"unexpected error"
 }
}
};

exports.update = async (id, form) => {
  try{
    let user = await this.isExist({ _id: id });
  if (user.success) {
    await User.findByIdAndUpdate(id,form);
    return {
      code: 200,
      success: true,
      record: user,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "User doesn't exist",
    };
  }
}catch(error){
  console.log("error"+error.message)
 return{
  success:false,
  code:500,
  error:"unexpected error"
 }
}
};

exports.get = async (filter) => {
  try{
  if (filter) {
    let record = await User.findOne(filter);
    return {
      code: 200,
      success: true,
      record,
    };
  } else {
    return {
      code: 404,
      success: true,
      error: "User not found",
    };
  }
}catch(error){
  console.log("error"+error.message)
 return{
  success:false,
  code:500,
  error:"unexpected error"
 }
}
};

exports.remove = async (id) => {
  try{
  const user = await this.isExist({ _id: id });
  if (id && user.success) {
    await User.findByIdAndDelete(id);
    return {
      code: 200,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "user doesn't exist",
    };
  }
}catch(error){
  console.log("error"+error.message)
  return{
   success:false,
   code:500,
   error:"unexpected error"
  }
}
};

 exports.comparePassword=async(email,password)=>{
  try{
 email=email.toLowerCase()
 let user=await this.isExist({email})
 if(user.success){
  let match=await bcrypt.compare(password,user.record.password)
  if(match){
    return{
    success:true,
    record:user.record,
    code:200
    }
  }
  else{
    return{
      success:false,
      code:409,
      error:"incorrect password"
      } 
  }
 }
  }catch(error){
    console.log("error"+error.message)
    return{
     success:false,
     code:500,
     error:"unexpected error"
    }
  }
}