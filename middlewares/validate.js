const {listingSchema, reviewSchema} = require("../schema");
const ExpressError = require("../utils/ExpressError");


// Joi Listing Validation Middleware

const validateListing = (req,res,next) => {
  let {error} = listingSchema.validate(req.body); 
  if (error) {
    let errorMsg = error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400, errorMsg);
  } else {
    next();
  }
};

// Joi Review Validation Middleware

const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body); 
    if (error) {
      let errorMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400, errorMsg);
    } else {
      next();
    }
  };

module.exports = {
    validateListing,
    validateReview
};