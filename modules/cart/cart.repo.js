const Cart = require("./cart.model");

exports.isExist = async (filter) => {
  try{
  let item = await Cart.findOne(filter);
  if (item) {
    return {
      code: 200,
      record: item,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "item is not found",
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
  let records = await Cart.find(filter);
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


exports.get = async (filter) => {
  try{
  if (filter) {
    let item = await Cart.findOne(filter);
    return {
      code: 200,
      success: true,
      item,
    };
  } else {
    return {
      code: 404,
      success: true,
      error: "Item not found",
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


exports.addItem=async(userId,productId,quantity)=>{
   try{
    let product = await this.isExist({_id:productId});
    if(product.success){
      let price=parseFloat(product.record.price)
      const cart=await this.isExist({user:userId})
      const isItemExists=await this.isItemInCart(cart.record.products,productId)
      if(isItemExists.success){
       let newQuantity=parseInt(isItemExists.record.quantity)+parseInt(quantity)
       let itemTotal=price*newQuantity
       let foundItem=cart.record.products[isItemExists.index]
       foundItem.quantity=newQuantity
       foundItem.total=itemTotal
       let cartUpdate=await this.calculateTotalOfAllProductsInCart(cart.record)
       return{
        success:true,
        record:cartUpdate.record,
        code:201
       }
      }
      else{
        if((cart.record.products).length!=0&&(cart.record.vendor).toString()!=(product.record.vendor)){
          return{
            success:false,
            error:"products from different vendor can not be added",
            code:409
          }
        }
        cart.record.vendor=product.record.vendor
        cart.record.products.push({_id:productId,product:product.record,quantity,total:(price*quantity)})
        let cartUpdate=await this.calculateTotalOfAllProductsInCart(cart.record)
        return{
          success:true,
          record:cartUpdate.record,
          code:201
        }
      }
    }
    else{
      return{
        success:false,
        error:product.error,
        code:404
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


exports.isItemInCart=async(arrayOfItems,productId)=>{
  try{
    let i=-1
    const result=await arrayOfItems.find(element=>{
      i++
      if(element._id==productId){return element}
    })
    if(result){
      return{
        success:true,
        record:result,
        index:i,
        code:200
      }
    }
    else{
      return{
        success:false,
        error:"item not found in cart",
        code:404

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

exports.calculateTotalOfAllProductsInCart=async(cart)=>{
   try{
    let cartTotal=0
    await cart.products.forEach(product => {
    let price=parseFloat(product.price)
    let total=price*product.quantity 
    cartTotal+=total
    });
    if((cart.products.length==0)){
      await Cart.findOneAndUpdate({_id:cart._id},
      {
        products:[],total:0,
        $unset:{vendor:1}
      })
       delete cart.vendor
    }
    else{
      await Cart.findByIdAndUpdate({_id:cart._id},{products:cart.products,total:cartTotal,
        vendor:cart.vendor})
    }
    cart.total=cartTotal
    return{
      success:true,
      record:cart,
      code:200
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


exports.removeItem=async(userId,productId,quantity)=>{
  try{
  const cart=await this.isExist({user:userId})
  const isItemExists=await this.isItemInCart(cart.record.products,productId)
  if(isItemExists.success){
   let newQuantity=parseInt(isItemExists.record.quantity)-parseInt(quantity)
   let itemTotal=parseFloat(isItemExists.record.product.price)*newQuantity
   let foundItem=cart.record.products[isItemExists.index]
   foundItem.quantity=newQuantity
   foundItem.total=itemTotal
   if(newQuantity<=0){
    await cart.record.products.splice(isItemExists.index,1)
    cartUpdate=await this.calculateTotalOfAllProductsInCart(cart.record)
    console.log(cartUpdate)
    return{
      success:true,
      record:cartUpdate.record,
      code:200
    }
   }
   await cart.record.products.splice(isItemExists.index,1,foundItem)
    cartUpdate=await this.calculateTotalOfAllProductsInCart(cart.record)
    return{
      success:true,
      record:cartUpdate.record,
      code:200
    }
  }
  else{
    return{
      success:false,
      error:"item is not found in the cart",
      code:404
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


exports.flush=async(filter)=>{
  try{
   await Cart.findOneAndUpdate(filter,
    {
     products:[],total:0,
     $unset:{vendor:1}
    })
    return{
      success:true,
      code:200
    }
  }catch(err){
  console.log(`err`,err)
  return{
    success:false,
    code:404,
    error:"cart not found"
  }
  }
}