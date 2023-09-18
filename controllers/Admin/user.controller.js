const repo=require("../../modules/user/user.repo")
const loggingService=require("../../services/logger.services")
const userLogger=new loggingService("user","user.controller")
const auditService=require("../../services/audit.services")
const User=require("../../modules/user/user.model")
const bcrypt=require("bcrypt")

const dateFormat=()=>{
    return new Date(Date.now())
  }
//addNewUser
let addUser = async(req, res) => {
    try{
    await repo.create(req.body)        
     res.status(200).json({message:"success",code:200})
    }catch(err){
        res.status(500).json({err: "Unexpected Error!"})  
    }
 }


 //getUserById 
const getUserById=async(req,res)=>{
    try{
    let id=req.params.id;
     let user=await repo.get({_id:id}) 
     let info={Action:req.originalUrl,Status:200}
    userLogger.info("Return All Users",info)       
     res.status(200).json({message:"success",user})
    }catch(err){
        userLogger.error(err.message)
        res.status(500).json({err: "Unexpected Error!"})  
    }
}


//getAllUsers
const getAllUsers=async(req,res)=>{
    try{
    let allUsers=await repo.list()
    let info={Action:req.originalUrl,Status:200}
    userLogger.info("Return All Users",info)  
    auditService.prepareAudit("GET_ALL_USERS",allUsers,null,"user",dateFormat())                    
    res.status(200).json({message:"success",users:allUsers,code:200})
  }catch(err){
    userLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_USERS",null,err,"user",dateFormat())
    res.status(500).json({err: "Unexpected Error!"})  
}
}


//updateUsers
const updateUser=async(req,res)=>{
    try{
    const targetUserId=req.params.id;
    let{firstName,lastName,Email,Password,Address,phone,role}=req.body;
    let user=await repo.update({_id:targetUserId},{firstName,lastName,Email,Password,Address,phone,role});
    res.status(201).json({message:"success",user,code:201});
  }catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
 }
}


//deleteUsers
const deleteUser=async(req,res)=>{
    try{
    const targetUserId=req.params.id;
  await repo.remove({_id:targetUserId})
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
    const {Email,Password}=req.body;
    let user=await User.findOne({Email});
    if(user){
     var match=await bcrypt.compare(Password,user.Password);
    
    if(match){
    
        res.status(201).json({message:"success",user,code:201})
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
    addUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    login  
}




















































































































//super admin ==>delete user, delete blog, get all blogs, get all users
//admin==> delete blog,get all blogs, get all users
//premium user==>get all blogs, get all users
//user==>get all blogs