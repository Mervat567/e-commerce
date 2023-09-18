const router=require("express").Router();
const reviewController=require("../../controllers/Admin/review.controller")
let{addReviewValidation,
    updateReviewValidation}=require("../../validation/reviewValidation/review.validation")
let validator=require("../../helpers/common.validate")   


//user routes
router.get("/getAllReviews",reviewController.getAllReviews); 
router.post("/addReview",validator(addReviewValidation),reviewController.addReview);

router.put("/updateReview/:id",validator(updateReviewValidation),reviewController.updateReview)
router.delete("/deleteReview/:id",reviewController.deleteReview);


module.exports=router


