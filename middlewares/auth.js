const Listing = require("../models/listing");
const Review = require("../models/review");

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }
    req.session.redirectUrl = req.originalUrl;
    req.session.error = "You must be logged in to access this page.";
    res.redirect("/user/login");
};


const isOwner = async (req,res,next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currentUser._id)) {
    req.session.error = "You are not authorised to perform this action!";
    return res.redirect(`/listings/show/${id}`);
  }
  next();
}

const isAuthor = async (req,res,next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currentUser._id)) {
    req.session.error = "You are not authorised to perform this action!";
    return res.redirect(`/listings/show/${id}`);
  }
  next();
}

module.exports = {
  isLoggedIn,
  isOwner,
  isAuthor,
};

module.exports.savedUrl = (req,res,next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  };
  next();
};