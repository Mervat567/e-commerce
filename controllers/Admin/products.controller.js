const repo=require("../../modules/products/product.repo")
const loggingService=require("../../services/logger.services")
const productLogger=new loggingService("products","products.controller")
const auditService=require("../../services/audit.services")

const dateFormat=()=>{
    return new Date(Date.now())
  }
//addNewProduct
let addProduct = async (req, res) => {
    try{
    await repo.create(req.body)        
     res.status(200).json({message:"success",code:200})
    }catch(err){
        res.status(500).json({err: "Unexpected Error!"})  
    }
 }



//getAllProducts
const getAllProducts=async(req,res)=>{
    try{
    let AllProducts=await repo.list()
    let info={Action:req.originalUrl,Status:200}
    productLogger.info("Return All products",info)  
    auditService.prepareAudit("GET_ALL_PRODUCTS",AllProducts,null,"product",dateFormat())             
    res.status(200).json({message:"success",products:AllProducts,code:200})
}catch(err){
    productLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_PRODUCTS",null,err,"product",dateFormat())
    res.status(500).json({err: "Unexpected Error!"})  
}
}

//updateProduct
const updateProduct=async(req,res)=>{
    try{
    const targetProductId=req.params.id;
    let{name,price,desc,Image,category_name}=req.body;
    let product=await repo.update({_id:targetProductId},{name,price,desc,Image,category_name});
    res.status(201).json({message:"success",product,code:201});
 }catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
 }
}


//deleteProduct
const deleteProduct=async(req,res)=>{
    try{
   const targetProductId=req.params.id;
   await repo.remove({_id:targetProductId});
   res.status(201).json({message:"success"});
 }catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
}

}

const uploadImages=async(req,res)=>{
  try{
   await repo.uploadImage(req.body)
   res.status(200).json({message:"success",code:200})
}catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
}

}

const addImagesToArray=async(req,res)=>{
    try{
     await repo.addToImagesArray(req.body)
     res.status(200).json({message:"success",code:200})
   }catch(err){
      res.status(500).json({err: "Unexpected Error!"})  
  }
  
  }
  
  const deleteImages=async(req,res)=>{
    try{
     await repo.deleteImage(req.body)
     res.status(200).json({message:"success",code:200})
   }catch(err){
      res.status(500).json({err: "Unexpected Error!"})  
  }
  
  }

  const removeImagesFromArray=async(req,res)=>{
    try{
     await repo.removeFromImagesArray(req.body)
     res.status(200).json({message:"success",code:200})
   }catch(err){
      res.status(500).json({err: "Unexpected Error!"})  
  }
  
  }

module.exports = {
   addProduct,
   getAllProducts,
   updateProduct,
   deleteProduct,
   uploadImages,
   addImagesToArray,
   deleteImages,
   removeImagesFromArray
}



