const router=require("express").Router();
const deliveryController=require("../../controllers/Admin/delivery.controller")
let{createDeliveryValidation,
    updateDeliveryValidation,confirmPasswordValidation}=require("../../validation/deliveryValidation/delivery.validation")
let validator=require("../../helpers/common.validate")   

let {checkSession}=require("../../utils/checkAuth.util")
let{verifyToken}=require("../../utils/token.util")
let endPoints=require("../../helpers/endPoints")
let checkRole=require=("../../utils/checkRole.util")

//user routes
router.get("/getAllDeliveries",//[checkSession,checkRole(endPoints.GET_ALL_DELIVERIES)],
deliveryController.getAllDeliveries); 

router.post("/createDelivery",validator(createDeliveryValidation,confirmPasswordValidation),deliveryController.createDelivery);
router.post("/loginDelivery",deliveryController.login);

router.put("/updateDelivery/:id",validator(updateDeliveryValidation,confirmPasswordValidation),deliveryController.updateDelivery)
router.delete("/deleteDelivery/:id",deliveryController.deleteDelivery);


module.exports=router


