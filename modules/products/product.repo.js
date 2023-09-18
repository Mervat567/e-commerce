 const { isNull } = require("util");
const Product = require("./product.model");
 const fs=require("fs")
 
exports.isExist = async (filter) => {
  try{
  let product = await Product.findOne(filter);
  if (product) {
    return {
      code: 200,
      record: product,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "product is not found",
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
  let records = await Product.find(filter);
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
  let product = await this.isExist({name:form.name});
  if (!product.success) {
    const newProduct = new Product(form);
    await newProduct.save();
    return {
      success: true,
      code: 200,
      record: newProduct,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Product already exists",
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
  let product = await this.isExist({ _id: id });
  if (product.success) {
    await Product.findByIdAndUpdate(id, form);
    return {
      code: 200,
      success: true,
      record: product.record,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Product doesn't exist",
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
    let record = await Product.findOne(filter);
    return {
      code: 200,
      success: true,
      record,
    };
  } else {
    return {
      code: 404,
      success: true,
      error: "Product not found",
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
  const product = await this.isExist({ _id: id });
  if (id && product.success) {
    await Product.findByIdAndDelete(id);
    return {
      code: 200,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "product doesn't exist",
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


exports.uploadImage=async(id)=>{ 
  try{
  let image=req.files
  const product=await this.isExist({_id:id})
  if(product.success){
   let oldImage=(product.success&&product.record.image) //?(product.record.image):null
   if(oldImage){
    try{
    await oldImage.map((image)=>{
      fs.unlikSync(image.path)
    })
    }catch(err){
    console.log(`err`,err.error)
    }
   }
   const update=await product.update(id,{image:image})
   if(update.success){
    res.status(update.code).json({success:update,record:update.record})
   }
  }

  }catch(err){
    console.log("error"+err.message)
    return{
     success:false,
     code:500,
     error:"unexpected error"
  }
}

}


exports.addToImagesArray=async(id)=>{
  try{
    const product=await this.isExist({_id:id})
   if(product.success){
   let oldImage=(product.success&&product.record.image) 
   let count=oldImage.length+req.files.length
   let image=req.files
   if(count<=6){
   await image.map((image)=>{
    oldImage.push(image)
   })
   }
   else{
    res.status(400).json({
      success:false,
      code:400,
      error:"the number of product images must be a maximum of 6 images"
    })
   }
   const update=await product.update(id,{image:oldImage})
   if(update.success){
    res.status(update.code).json({success:update.success,record:update.record})
   }
   else{
    res.status(update.code).json({success:update.success,error:update.error})
   }
  }
  else{
    res.status(409).json({
      success:false,
      error:"you can only control your products",
      code:409
    })
  }
  }catch(err){
    console.log("error"+err.message)
    return{
     success:false,
     code:500,
     error:"unexpected error"
  }
  }
}


exports.deleteImage=async(id)=>{
   try{
    const product=await this.isExist({_id:id})
    if(product.success){
     let oldImage=(product.success&&product.record.image) 
     if(oldImage){
      try{
      await oldImage.map((image)=>{
        fs.unlikSync(image.path)
      })
    }
   catch(err){
    console.log(`err`,err.error)
   }
}
const update=await product.update(id,{image:[]})
if(update.success){
 res.status(update.code).json({success:update.success,code:update.code})
}
 
else{
   res.status(update.code).json({success:update.success,code:update.code})
}
    }
else{
  res.status(409).json({
    success:false,
    error:"you can only control your products",
    code:409
  })
}
   }catch(err){
    console.log("error"+err.message)
    return{
     success:false,
     code:500,
     error:"unexpected error"
  }
   }
}


exports.removeFromImagesArray=async(id)=>{
   try{
    const product=await this.isExist({_id:id})
    if(product.success){
      await req.body.paths.map((path)=>{
       product.update(id,{$pull:{image:{path}}})
       fs.unlikSync(path)
      })
      res.status(200).json({success:true,code:200})
    }
    else{
      res.status(409).json({
        success:false,
        error:"you can only control your products",
        code:409
      })
    }
   }catch(err){
    console.log("error"+err.message)
    return{
     success:false,
     code:500,
     error:"unexpected error"
  }
   }
}