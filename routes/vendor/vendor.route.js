const router=require("express").Router();
const vendorController=require("../../controllers/Admin/vendor.controller")
let{confirmPasswordValidation,addVendorValidation
    ,updateVendorValidation}=require("../../validation/vendorValidation/vendor.validation")
let validator=require("../../helpers/common.validate")   


//user routes
router.get("/getAllVendors",vendorController.getAllVendors); 
router.post("/addVendor",validator(addVendorValidation,confirmPasswordValidation),vendorController.addVendor);
router.post("/loginVendor",vendorController.login);

router.put("/updateVendor/:id",validator(updateVendorValidation,confirmPasswordValidation),vendorController.updateVendor)
router.delete("/deleteVendor/:id",vendorController.deleteVendor);


module.exports=router


