const repo=require("../../modules/review/review.repo")
const loggingService=require("../../services/logger.services")
const reviewLogger=new loggingService("review","review.controller")
const auditService=require("../../services/audit.services")


const dateFormat=()=>{
    return new Date(Date.now())
  }
//addReview
let addReview = async (req, res) => {
    try{
     await repo.create(req.body)        
     res.status(200).json({message:"success",code:200})
    }catch(err){
        res.status(500).json({err: "Unexpected Error!"})  
    }
 }


//getAllReviews
const getAllReviews=async(req,res)=>{
    try{
    let allReviews=await repo.list()
    let info={Action:req.originalUrl,Status:200}
    reviewLogger.info("Return All reviews",info)  
    auditService.prepareAudit("GET_ALL_REVIEWS",allReviews,null,"review",dateFormat())                 
    res.status(200).json({message:"success",reviews:allReviews,code:200})
}catch(err){
    reviewLogger.error(err.message)
    auditService.prepareAudit("GET_ALL_REVIEWS",null,err,"review",dateFormat())
    res.status(500).json({err: "Unexpected Error!"})  
}
}


//updateReview
const updateReview=async(req,res)=>{
    try{
    const targetReviewId=req.params.id;
    let{title,content,created_at,updated_at,user}=req.body;
    let review=await repo.update({_id:targetReviewId},{title,content,created_at,updated_at,user});
    res.status(201).json({message:"success",review,code:201});
 }catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
 }
}


  
//deleteReview
const deleteReview=async(req,res)=>{
    try{
    const targetReviewId=req.params.id;
   await repo.remove({_id:targetReviewId});
   res.status(201).json({message:"success"});
}catch(err){
    res.status(500).json({err: "Unexpected Error!"})  
}

}



module.exports = {
    addReview,
    getAllReviews,
    updateReview,
    deleteReview
}



