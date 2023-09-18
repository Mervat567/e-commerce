const repo=require("../../modules/wishlist/wishlist.repo")
const loggingService=require("../../services/logger.services")
const wishlistLogger=new loggingService("wishlist","wishlist.controller")
const auditService=require("../../services/audit.services")


const dateFormat=()=>{
    return new Date(Date.now())
  }
//addNewWishlist
let addWishlist = async (req, res) => {
    try{
    await repo.create(req.body)        
     res.status(200).json({message:"success",code:200})
    }catch(err){
        res.status(500).json({err: "Unexpected Error!"})  
    }
 }


//getAllWishlists
const getAllWishlists=async(req,res)=>{
    try{
    let allWishlists=await repo.list()
    let info={Action:req.originalUrl,Status:200}
    wishlistLogger.info("Return All wishlists",info)  
    auditService.prepareAudit("GET_ALL_WISHLISTS",allWishlists,null,"wishlist",dateFormat())                    
    res.status(200).json({message:"success",wishlists:allWishlists,code:200})
}catch(err){
    wishlistLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_WISHLISTS",null,err,"wishlist",dateFormat())
    res.status(500).json({err: "Unexpected Error!"})  
}
}


//updateWishlist
const updateWishlist=async(req,res)=>{
    try{
    const targetWishlistId=req.params.id;
    let{products,user}=req.body;
    let wishlist=await repo.update({_id:targetWishlistId},{products,user});
    res.status(201).json({message:"success",wishlist,code:201});
}catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
}
}


  
//deleteWishlist
const deleteWishlist=async(req,res)=>{
    try{
    const targetWishlistId=req.params.id;
   await repo.remove({_id:targetWishlistId});
   res.status(201).json({message:"success"});
}catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
}

}



module.exports = {
    addWishlist,
    getAllWishlists,
    updateWishlist,
    deleteWishlist
}



