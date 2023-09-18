const router=require("express").Router();
const wishlistController=require("../../controllers/Admin/wishlist.controller")
let{addWishlistValidation
    ,updateWishlistValidation}=require("../../validation/whishlistValidation/wishlist.validation")
let validator=require("../../helpers/common.validate")   


//user routes
router.get("/getAllWishlists",wishlistController.getAllWishlists); 
router.post("/addWishlist",validator(addWishlistValidation),wishlistController.addWishlist);

router.put("/updateWishlist/:id",validator(updateWishlistValidation),wishlistController.updateWishlist)
router.delete("/deleteWishlist/:id",wishlistController.deleteWishlist);


module.exports=router


