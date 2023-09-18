const router=require("express").Router();
const userController=require("../../controllers/Admin/user.controller")
let{confirmPasswordValidation,addUserValidation,
    updateUserValidation}=require("../../validation/userValidation/user.validation")
let validator=require("../../helpers/common.validate")   
let endPoints=require("../../helpers/endPoints")
let checkRole=require("../../utils/checkRole.util")
let {checkSessions}=require("../../utils/checkAuth.util")

//user routes
router.get("/getAllUsers",userController.getAllUsers)//[checkSessions,checkRole(endPoints.GET_ALL_USERS)],userController.getAllUsers); 
router.get("/user/:id",userController.getUserById);

router.post("/addUser",validator(addUserValidation,confirmPasswordValidation),userController.addUser)
router.post("/loginUser",userController.login);

router.put("/updateUser/:id",validator(updateUserValidation,confirmPasswordValidation),userController.updateUser);
router.delete("/deleteUser/:id",userController.deleteUser)  //checkRole(endPoints.DELETE_USER),;


module.exports=router


