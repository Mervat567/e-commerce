let joi=require("joi");

module.exports={

addOrderValidation:{
    body:joi.object().required().keys({
        r_time:joi.date().empty().required().messages({
        "date.base":"please enter a valid date ",
        "date.empty":"date cannot be empty",
        "any.required":"date must be entered",
        "date.alphanum":"please enter a valid date",
        
      }),
      a_time:joi.date().empty().required().messages({
        "date.base":"please enter a valid date ",
        "date.empty":"date cannot be empty",
        "any.required":"date must be entered",
        "date.alphanum":"please enter a valid date",

      }),
      quantity:joi.number().empty().required().messages({
        "number.base":"please enter a valid quantity ",
        "number.empty":"quantity cannot be empty",
        "any.required":"quantity must be entered",
        
      }),
      
      Email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','hhh']}}).empty().required().messages({
        "string.email":"please enter a valid email ",
        "any.required":"email must be entered",
        "string.empty":"email cannot be empty"
    }),
          Password:joi.string().empty().required()
          .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
              "string.base":"please enter a valid password ",
              "any.required":"password must be entered",
              "string.empty":"password cannot be empty",
              "string.pattern.base":"please enter a valid password A-Z,a-zm0-9,special character"
          }),
          firstName:joi.string().empty().required().pattern(new RegExp(/^[a-z,.'-]+$/i)).messages({
            "string.base":"please enter a valid first name ",
            "string.empty":"first name cannot be empty",
            "any.required":"first name must be entered",
            "string.pattern.base":"please enter a valid first name"
          }),
          lastName:joi.string().empty().required().pattern(new RegExp(/^[a-z,.'-]+$/i)).messages({
            "string.base":"please enter a valid last name ",
            "string.empty":"last name cannot be empty",
            "any.required":"last name must be entered",
            "string.pattern.base":"please enter a valid last name"
          }),
          Address:joi.string().empty().alphanum().required().min(1).max(7).messages({
            "string.base":"please enter a valid address ",
            "string.empty":"address cannot be empty",
            "any.required":"address must be entered",
            "string.alphanum":"please enter a valid address",
            "string.min":"no of characters must be between 1 and 7",
            "string.max":"no of characters must be between 1 and 7",
          }),
  
      })
    },
  


updateOrderValidation:{
    body:joi.object().required().keys({
      
        r_time:joi.date().empty().required().messages({
        "date.base":"please enter a valid date ",
        "date.empty":"date cannot be empty",
        "any.required":"date must be entered",
        "date.alphanum":"please enter a valid date",

      }),
      a_time:joi.date().empty().required().messages({
        "date.base":"please enter a valid date ",
        "date.empty":"date cannot be empty",
        "any.required":"date must be entered",
        "date.alphanum":"please enter a valid date",

      }),
      quantity:joi.number().empty().required().messages({
        "number.base":"please enter a valid quantity ",
        "number.empty":"quantity cannot be empty",
        "any.required":"quantity must be entered",
        
      }),

      Email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','hhh']}}).empty().required().messages({
        "string.email":"please enter a valid email ",
        "any.required":"email must be entered",
        "string.empty":"email cannot be empty"
    }),
          Password:joi.string().empty().required()
          .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
              "string.base":"please enter a valid password ",
              "any.required":"password must be entered",
              "string.empty":"password cannot be empty",
              "string.pattern.base":"please enter a valid password A-Z,a-zm0-9,special character"
          }),
          firstName:joi.string().empty().required().pattern(new RegExp(/^[a-z,.'-]+$/i)).messages({
            "string.base":"please enter a valid first name ",
            "string.empty":"first name cannot be empty",
            "any.required":"first name must be entered",
            "string.pattern.base":"please enter a valid first name"
          }),
          lastName:joi.string().empty().required().pattern(new RegExp(/^[a-z,.'-]+$/i)).messages({
            "string.base":"please enter a valid last name ",
            "string.empty":"last name cannot be empty",
            "any.required":"last name must be entered",
            "string.pattern.base":"please enter a valid last name"
          }),
          Address:joi.string().empty().alphanum().required().min(1).max(7).messages({
            "string.base":"please enter a valid address ",
            "string.empty":"address cannot be empty",
            "any.required":"address must be entered",
            "string.alphanum":"please enter a valid address",
            "string.min":"no of characters must be between 1 and 7",
            "string.max":"no of characters must be between 1 and 7",
          }),
  
  })
},


}