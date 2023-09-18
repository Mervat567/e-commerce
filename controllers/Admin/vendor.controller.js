const repo=require("../../modules/vendor/vendor.repo")
const loggingService=require("../../services/logger.services")
const vendorLogger=new loggingService("vendor","vendor.controller")
const auditService=require("../../services/audit.services")
const Vendor=require("../../modules/vendor/vendor.model")
const bcrypt=require("bcrypt")

const dateFormat=()=>{
    return new Date(Date.now())
  }
//addNewVendor
let addVendor = async (req, res) => {
    try{
    await repo.create(req.body)        
     res.status(200).json({message:"success",code:200})
    }catch(err){
        res.status(500).json({err: "Unexpected Error!"})  
    }
 }


//getAllVendors
const getAllVendors=async(req,res)=>{
    try{
    let allVendors=await repo.list()
    let info={Action:req.originalUrl,Status:200}
    vendorLogger.info("Return All vendors",info)  
    auditService.prepareAudit("GET_ALL_VENDORS",allVendors,null,"vendor",dateFormat())                    
    res.status(200).json({message:"success",vendors:allVendors,code:200})
}catch(err){
    vendorLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_VENDORS",null,err,"vendor",dateFormat())
    res.status(500).json({err: "Unexpected Error!"})  
}
}

//updateUsers
const updateVendor=async(req,res)=>{
    try{
    const targetVendorId=req.params.id;
    let{firstName,lastName,email,password,address,phone,role}=req.body;
    let vendor=await repo.update({_id:targetVendorId},{firstName,lastName,email,password,address,phone,role});
    res.status(201).json({message:"success",vendor,code:201});
  }catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
 }
}

//deleteVendor
const deleteVendor=async(req,res)=>{
    try{
    const targetVendorId=req.params.id;
   await repo.remove({_id:targetVendorId});
   res.status(201).json({message:"success"});
}catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
}

}


// const login=async(req,res)=>{
//     try{
//    await repo.comparePassword(email,password)
//    res.status(200).json({message:"success",code:200})
//     }catch(err){
//         res.status(500).json({err: "Unexpected Error!"})  

//     }
// }

let login=async (req,res)=>{
    const {email,password}=req.body;
    let vendor=await Vendor.findOne({email});
    if(vendor){
     var match=await bcrypt.compare(password,vendor.password);
    
    if(match){
    
        res.status(201).json({message:"success",vendor,code:201})
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
   addVendor,
   getAllVendors,
   updateVendor,
   deleteVendor,
   login
}



