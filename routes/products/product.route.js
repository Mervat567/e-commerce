const router=require("express").Router();
const productController=require("../../controllers/Admin/products.controller")
let{addProductValidation,
    updateProductValidation}=require("../../validation/productsValidation/products.validation")
let validator=require("../../helpers/common.validate")   


//user routes
router.get("/getAllProducts",productController.getAllProducts); 
router.post("/addProduct",validator(addProductValidation),productController.addProduct);

router.put("/updateProduct/:id",validator(updateProductValidation),productController.updateProduct)
router.delete("/deleteProduct/:id",productController.deleteProduct);


module.exports=router


