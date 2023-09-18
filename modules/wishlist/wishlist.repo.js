const Wishlist = require("./wishlist.model");

exports.isExist = async (filter) => {
  let wishlist = await Wishlist.findOne(filter);
  if (wishlist) {
    return {
      code: 200,
      record: wishlist,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "wishlist is not found",
    };
  }
};

exports.list = async (filter) => {
  try{
  let records = await Wishlist.find(filter);
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
  let wishlist = await this.isExist({ product_name: form.product_name });
  if (!wishlist.success) {
    const newWishlist = new Wishlist(form);
    await newWishlist.save();
    return {
      success: true,
      code: 200,
      record: newWishlist,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "wishlist already exists",
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
  let wishlist = await this.isExist({ _id: id });
  if (wishlist.success) {
    await Wishlist.findByIdAndUpdate(id, form);
    return {
      code: 200,
      success: true,
      record: Wishlist,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Whishlist doesn't exist",
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
    let record = await Wishlist.findOne(filter);
    return {
      code: 200,
      success: true,
      record,
    };
  } else {
    return {
      code: 404,
      success: true,
      error: "Wishlist not found",
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
  const wishlist = await this.isExist({ _id: id });
  if (id && wishlist.success) {
    await Wishlist.findByIdAndDelete(id);
    return {
      code: 200,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "wishlist doesn't exist",
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

