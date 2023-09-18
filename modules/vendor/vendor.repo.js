const Vendor = require("./vendor.model");
const bcrypt=require("bcrypt")


exports.isExist = async (filter) => {
  try{
  let vendor = await Vendor.findOne(filter);
  if (vendor) {
    return {
      code: 200,
      record: vendor,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "vendor is not found",
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
  let records = await Vendor.find(filter).select("-password");
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
  let vendor = await this.isExist({ email: form.email });
  if (!vendor.success) {
    const newVendor = new Vendor(form);
    await newVendor.save();
    return {
      success: true,
      code: 200,
      record: newVendor,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Vendor already exists",
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
  await Vendor.findByIdAndUpdate(id, form);
  let vendor = await this.isExist({ _id: id });
  if (vendor.success) {
    return {
      code: 200,
      success: true,
      record: vendor.record,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Vendor doesn't exist",
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
    let record = await Vendor.findOne(filter);
    return {
      code: 200,
      success: true,
      record,
    };
  } else {
    return {
      code: 404,
      success: true,
      error: "Vendor not found",
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
  const vendor = await this.isExist({ _id: id });
  if (id && vendor.success) {
    await Vendor.findByIdAndDelete(id);
    return {
      code: 200,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "vendor doesn't exist",
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
 let vendor=await this.isExist({email})
 if(vendor.success){
  let match=await bcrypt.compare(password,vendor.record.password)
  if(match){
    return{
    success:true,
    record:vendor.record,
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