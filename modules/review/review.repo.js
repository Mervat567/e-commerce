const Review = require("./review.model");

exports.isExist = async (filter) => {
  try{
  let review = await Review.findOne(filter);
  if (review) {
    return {
      code: 200,
      record: review,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "review is not found",
    };
  }
}catch(error){
  console.log("error"+error.message)
  return{
   success:false,
   code:500,
   error:"unexpected error"
  }
}
};
exports.list = async (filter) => {
  try{
  let records = await Review.find(filter);
  return {
    code: 200,
    records,
    success: true,
  };
}catch(error){
    console.log("error"+error.message)
    return{
     success:false,
     code:500,
     error:"unexpected error"
    }
  }
};

exports.create = async (form) => {
  try{
  let review = await this.isExist({title:form.title});
  if (!review.success) {
    const newReview = new Review(form);
    await newReview.save();
    return {
      success: true,
      code: 200,
      record: newReview,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "Review already exists",
    };
  }
}catch(error){
  console.log("error"+error.message)
  return{
   success:false,
   code:500,
   error:"unexpected error"
  }
}
};

exports.update = async (id, form) => {
  try{
  let review = await this.isExist({ _id: id });
  if (review.success) {
    await Review.findByIdAndUpdate(id, form);
    return {
      code: 200,
      success: true,
      record: review.record,
    };
  } else {
    return {
      code: 400,
      success: false,
      error: "Review doesn't exist",
    };
  }
}catch(error){
  console.log("error"+error.message)
  return{
   success:false,
   code:500,
   error:"unexpected error"
  }
}
};

exports.get = async (filter) => {
  try{
  if (filter) {
    let record = await Review.findOne(filter);
    return {
      code: 200,
      success: true,
      record,
    };
  } else {
    return {
      code: 404,
      success: true,
      error: "Review not found",
    };
  }
}catch(error){
  console.log("error"+error.message)
  return{
   success:false,
   code:500,
   error:"unexpected error"
  }
}
};

exports.remove = async (id) => {
  try{
  const review = await this.isExist({ _id: id });
  if (id && review.success) {
    await Review.findByIdAndDelete(id);
    return {
      code: 200,
      success: true,
    };
  } else {
    return {
      code: 404,
      success: false,
      error: "review doesn't exist",
    };
  }
}catch(error){
  console.log("error"+error.message)
  return{
   success:false,
   code:500,
   error:"unexpected error"
  }
}
};
