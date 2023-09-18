const router=require("express").Router();
const orderController=require("../../controllers/Admin/orders.controller")
let{addOrderValidation,
    updateOrderValidation}=require("../../validation/ordersValidation/orders.validation")
let validator=require("../../helpers/common.validate")   

//user routes
router.get("/getAllOrders",orderController.getAllOrders); 
router.post("/addOrder",validator(addOrderValidation),orderController.addOrder);

router.put("/updateOrder/:id",validator(updateOrderValidation),orderController.updateOrder)
router.delete("/deleteOrder/:id",orderController.deleteOrder);


module.exports=router


