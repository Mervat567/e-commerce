const router=require("express").Router();
const cartController=require("../../controllers/Admin/cart.controller")
let{addItemValidation}=require("../../validation/cartValidation/cart.validation")
let validator=require("../../helpers/common.validate")   


//user routes
router.get("/getAllItems",cartController.getAllItems); 
router.post("/addItem",cartController.addItem);

// router.put("/updateItem/:id",validator(updateItemValidation),cartController.updateItem)
router.delete("/deleteItem/:id",cartController.deleteItem);


module.exports=router


