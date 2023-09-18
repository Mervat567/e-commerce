const repo=require("../../modules/delivery/delivery.repo")
const loggingService=require("../../services/logger.services")
const deliveryLogger=new loggingService("delivery","delivery.controller")
const auditService=require("../../services/audit.services")
const Delivery=require("../../modules/delivery/delivery.model")
const bcrypt=require("bcrypt")
let {generateToken}=require("../../utils/token.util")
let day=3600000*24;

const dateFormat=()=>{
  return new Date(Date.now())
}
//addNewDelivery
let createDelivery = async(req, res) => {
    try{
    await repo.create(req.body)        
     res.status(200).json({message:"success",code:200})
    }catch(err){
        res.status(500).json({err: "Unexpected Error!"})  
    }
 }


//getAllDeliveries
const getAllDeliveries=async(req,res)=>{
    try{
    let AllDeliveries=await repo.list() 
    let info={Action:req.originalUrl,Status:200}
    deliveryLogger.info("Return All deliveries",info)  
    auditService.prepareAudit("GET_ALL_DELIVERIES",AllDeliveries,null,"delivery",dateFormat())        
    res.status(200).json({message:"success",deliveries:AllDeliveries,code:200})
  }catch(err){
    deliveryLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_DELIVERIES",null,err,"delivery",dateFormat())
    res.status(500).json({err: "Unexpected Error!"})  
}
}


//updateUsers
const updateDelivery=async(req,res)=>{
    try{
    const targetDeliveryId=req.params.id;
    let{firstName,lastName,email,password,address,phone,vendor}=req.body;
    let delivery=await repo.update({_id:targetDeliveryId},{firstName,lastName,email,password,address,phone,vendor});
    res.status(201).json({message:"success",delivery,code:201});
  }catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
 }
}


//deleteUsers
const deleteDelivery=async(req,res)=>{
    try{
    const targetDeliveryId=req.params.id;
  await repo.remove({_id:targetDeliveryId})
   res.status(201).json({message:"success"});
 }catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
}

}


// const login=async(req,res)=>{
//   try{
//  let delivery=await repo.comparePassword(req.body)
//    if(delivery){
//    res.status(200).json({message:"success",delivery,code:200})
//    }
//  else if(!delivery){
//   res.status(400).json({message:"incorrect password",code:400})
// }
// else{
//   res.status(404).json({message:"user not found",code:404})
// }
//   }catch(err){
//       res.status(500).json({err: "Unexpected Error!"})  

//   }
// }

let login=async (req,res)=>{
  const {Email,Password}=req.body;
  let delivery=await Delivery.findOne({Email});
  if(delivery){
   var match=await bcrypt.compare(Password,delivery.Password);
  
  if(match){
       const token=await generateToken({delivery})
        req.session.cookie.expires=new Date(Date.now()+day)
        req.session.cookie.maxAge=day
        req.session.delivery=delivery
         await req.session.save()
      res.status(201).json({message:"success",code:201,token})
  }
  else{
      res.status(400).json({message:"incorrect password"})
  }
}
else{
  res.status(404).json({message:"user not found",code:404})
}
}

module.exports = {
   createDelivery,
   getAllDeliveries,
   updateDelivery,
   deleteDelivery,
   login
}




















































































































//super admin ==>delete user, delete blog, get all blogs, get all users
//admin==> delete blog,get all blogs, get all users
//premium user==>get all blogs, get all users
//user==>get all blogs


