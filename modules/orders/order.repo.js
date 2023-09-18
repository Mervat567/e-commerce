const Order = require("./order.model");

exports.isExist = async (filter) => {
  try{
  let order = await Order.findOne(filter);
  if (order) {
    return {
      code: 200,
      record: order,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "order is not found",
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
  let records = await Order.find(filter);
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

exports.create = async (userId,orderId) => {
  try{
  let order = await this.isExist({_id:orderId});
  if (!order.success) {
    const newOrder = new Order(userId);
    await newOrder.save();
    return {
      success: true,
      code: 200,
      record: newOrder,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Order already exists",
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
  let order = await this.isExist({ _id: id });
  if (order.success) {
    await Order.findByIdAndUpdate(id, form);
    return {
      code: 200,
      success: true,
      record: order.record,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "order doesn't exist",
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
    let record = await Order.findOne(filter);
    return {
      code: 200,
      success: true,
      record,
    };
  } else {
    return {
      code: 404,
      success: true,
      error: "Order not found",
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
  const order = await this.isExist({ _id: id });
  if (id && order.success) {
    await Order.findByIdAndDelete(id);
    return {
      code: 200,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "order doesn't exist",
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
