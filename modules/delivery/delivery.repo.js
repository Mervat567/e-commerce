const Delivery = require("./delivery.model");
const bcrypt=require("bcrypt")


exports.isExist = async (filter) => {
  try{
  let delivery = await Delivery.findOne(filter);
  if (delivery) {
    return {
      code: 200,
      record: delivery,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "delivery is not found",
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
  let records = await Delivery.find(filter);
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
  let delivery = await this.isExist({ Email: form.Email });
  if (!delivery.success) {
    const newDelivery = new Delivery(form);
    await newDelivery.save();
    return {
      success: true,
      code: 200,
      record: newDelivery,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Delivery already exists",
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
  let delivery = await this.isExist({ _id: id });
  if (delivery.success) {
    await Delivery.findByIdAndUpdate(id, form);
    return {
      code: 200,
      success: true,
      record: delivery.record,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Delivery doesn't exist",
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
    let record = await Delivery.findOne(filter);
    return {
      code: 200,
      success: true,
      record,
    };
  } else {
    return {
      code: 404,
      success: true,
      error: "Delivery not found",
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
  const delivery = await this.isExist({ _id: id });
  if (id && delivery.success) {
    await Delivery.findByIdAndDelete(id);
    return {
      code: 200,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "delivery doesn't exist",
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

// exports.comparePassword=async(Email,Password)=>{
//   try{
// //  Email.toLowerCase()
//  let delivery=await this.isExist(Email)
//  if(delivery.success){
//   let match=await bcrypt.compare(Password,delivery.record.Password)
//   if(match){
//     return{
//     success:true,
//     record:delivery.record,
//     code:200
//     }
//   }
//   else{
//     return{
//       success:false,
//       code:409,
//       error:"incorrect password"
//       } 
//   }
//  }
//  else{
//   return{
//   success:false,
//   code:404,
//   error:" user not found"
//   }
// }
//   }catch(error){
//     console.log("error"+error.message)
//     return{
//      success:false,
//      code:500,
//      error:"unexpected error"
//     }
//   }
// }
