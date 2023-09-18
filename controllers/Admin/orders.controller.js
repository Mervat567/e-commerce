const repo=require("../../modules/orders/order.repo")
const loggingService=require("../../services/logger.services")
const orderLogger=new loggingService("orders","orders.controller")
const auditService=require("../../services/audit.services")

const dateFormat=()=>{
    return new Date(Date.now())
  }

//addNewOrder
let addOrder = async (req, res) => {
    try{
      await repo.create(req.body)        
     res.status(200).json({message:"success",code:200})
    }catch(err){
        res.status(500).json({err: "Unexpected Error!"})  
    }
 }


//getAllOrders
const getAllOrders=async(req,res)=>{
    try{
    let allOrders=await repo.list()
    let info={Action:req.originalUrl,Status:200}
    orderLogger.info("Return All orders",info)  
    auditService.prepareAudit("GET_ALL_ORDERS",allOrders,null,"order",dateFormat())             
    res.status(200).json({message:"success",orders:allOrders,code:200})
 }catch(err){
   orderLogger.error(err.message)
   auditService.prepareAudit("GET_ALL_ORDERS",null,err,"order",dateFormat())
    res.status(500).json({err: "Unexpected Error!"})  
}
}


//updateOrder
const updateOrder=async(req,res)=>{
    try{
    const targetOrderId=req.params.id;
    let{r_time,a_time,products,user,delivery}=req.body;
    let order=await repo.update({_id:targetOrderId},{r_time,a_time,products,user,delivery});
    res.status(201).json({message:"success",order,code:201});
 }catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
 }
}


//deleteOrder
const deleteOrder=async(req,res)=>{
    try{
    const targetOrderId=req.params.id;
   await repo.remove({_id:targetOrderId});
   res.status(201).json({message:"success"});
 }catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
}

}



module.exports = {
   addOrder,
   updateOrder,
   getAllOrders,
   deleteOrder
}



