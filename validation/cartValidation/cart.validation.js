let joi=require("joi");

module.exports={

addItemValidation:{
    body:joi.object().required().keys({
     quantity:joi.number().empty().required().messages({
        "number.base":"please enter a valid quantity ",
        "number.empty":"quantity cannot be empty",
        "any.required":"quantity must be entered",
       
      }),
      price:joi.number().empty().required().messages({
        "number.base":"please enter a valid  totalPrice",
        "number.empty":"totalPrice cannot be empty",
        "any.required":"totalPrice must be entered",
        "number.alphanum":"please enter a valid totalPrice",

      }),
  })
},

updateItemValidation:{
    body:joi.object().required().keys({
     quantity:joi.number().empty().required().messages({
        "number.base":"please enter a valid quantity ",
        "number.empty":"quantity cannot be empty",
        "any.required":"quantity must be entered",
        "number.alphanum":"please enter a valid quantity",

      }),
      price:joi.number().empty().required().messages({
        "number.base":"please enter a valid  totalPrice",
        "number.empty":"totalPrice cannot be empty",
        "any.required":"totalPrice must be entered",
        "number.alphanum":"please enter a valid totalPrice",

      }),
  })
},



}