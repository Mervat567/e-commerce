let joi=require("joi");

module.exports={
    
addProductValidation:{
    body:joi.object().required().keys({
          
      name:joi.string().empty().required().pattern(new RegExp(/^[a-z,.'-]+$/i)).messages({
        "string.base":"please enter a valid  name ",
        "string.empty":" name cannot be empty",
        "any.required":"name must be entered",
        "string.pattern.base":"please enter a valid name"
      }),
      price:joi.number().empty().required().messages({
        "number.base":"please enter a valid price ",
        "number.empty":"price cannot be empty",
        "any.required":"price must be entered",
        "number.alphanum":"please enter a valid price",
        
      }),
      desc:joi.string().min(10).max(120).required().messages({
        "string.base":"please enter a valid desc ",
        "string.min":"desc must be between 10 and 120",
        "string.max":"desc must be between 10 and 120",
        "any.required":"desc must be entered",
      }),
      // Image:joi.object().required().messages({
      //   "object.base":"please enter a valid image ",
      //   "any.required":"image must be entered",
      // }),
   category_name:joi.string().min(10).max(20).required().messages({
        "string.base":"please enter a valid  category_name",
        "string.min":"category_name must be between 10 and 20",
        "string.max":"category_name must be between 10 and 20",
        "any.required":"category_name must be entered",
      }),
  })
},
updateProductValidation:{
    body:joi.object().required().keys({
          
      name:joi.string().empty().required().pattern(new RegExp(/^[a-z,.'-]+$/i)).messages({
        "string.base":"please enter a valid  name ",
        "string.empty":" name cannot be empty",
        "any.required":"name must be entered",
        "string.pattern.base":"please enter a valid name"
      }),
      price:joi.number().empty().required().messages({
        "number.base":"please enter a valid price ",
        "number.empty":"price cannot be empty",
        "any.required":"price must be entered",
        "number.alphanum":"please enter a valid price",
        
      }),
      desc:joi.string().min(10).max(120).required().messages({
        "string.base":"please enter a valid desc ",
        "string.min":"desc must be between 10 and 120",
        "string.max":"desc must be between 10 and 120",
        "any.required":"desc must be entered",
      }),
      // Image:joi.object().required().messages({
      //   "object.base":"please enter a valid image ",
      //   "any.required":"image must be entered",
      // }),
   category_name:joi.string().min(10).max(20).required().messages({
        "string.base":"please enter a valid  category_name",
        "string.min":"category_name must be between 10 and 20",
        "string.max":"category_name must be between 10 and 20",
        "any.required":"category_name must be entered",
      }),
  })
},


}