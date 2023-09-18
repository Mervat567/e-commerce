const repo=require("../../modules/cart/cart.repo")
const loggingService=require("../../services/logger.services")
const cartLogger=new loggingService("cart","cart.controller")
const auditService=require("../../services/audit.services")

const dateFormat=()=>{
    return new Date(Date.now())
}

//addNewItem
let addItem = async (req, res) => {
    try{
    await repo.addItem(req.body)        
     res.status(200).json({message:"success",code:200})
    }catch(err){
        res.status(500).json({err: "Unexpected Error!"})  
    }
 }

//getAllItems
const getAllItems=async(req,res)=>{
    try{
    let allItems=await repo.list()
    let info={Action:req.originalUrl,Status:200}
    cartLogger.info("Return All items",info) 
    auditService.prepareAudit("GET_ALL_ITEMS",allItems,null,"item",dateFormat())      
    res.status(200).json({message:"success",items:allItems,code:200})
 }catch(err){
    cartLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_ITEMS",null,err,"item",dateFormat())
    res.status(500).json({err: "Unexpected Error!"})  
}
}

//updateItem
// const updateItem=async(req,res)=>{
//     try{
//     const targetItemId=req.params.id;
//     let{products,user}=req.body;
//     let item=await repo.update({_id:targetItemId},{products,user});
//     res.status(201).json({message:"success",item,code:201});
//  }catch(err){
//     res.status(500).json({err: "Unexpected Error!"})  
//  }
// }

//removeItems
const deleteItem=async(req,res)=>{
    try{
    const targetItemId=req.params.id;
   await repo.removeItem({_id:targetItemId})
   res.status(201).json({message:"success"});
 }catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
}

}




module.exports = {
    addItem,
    getAllItems,
    deleteItem
}
