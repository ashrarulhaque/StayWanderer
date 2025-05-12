const Review = require("../models/review");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

module.exports.reviewCreate = async (req,res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    let redirectUrl = res.locals.redirectUrl || `/listings/show/${req.params.id}`;
    req.session.success = "Review successfully created!"; // Success message
    res.redirect(redirectUrl); // Redirect to your desired page
};

module.exports.reviewDestroy = async (req, res) => {
    const { id, reviewId } = req.params;
  
    // 1. Find the listing
    const listing = await Listing.findById(id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found.");
    }
  
    const isReviewInListing = listing.reviews.includes(reviewId);
  
    if (!isReviewInListing) {
      throw new ExpressError(403, "Unauthorized: Review does not belong to this listing.");
    }
  
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      throw new ExpressError(404, "Review not found.");
    }
  
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.session.success = "Review successfully deleted!";
    res.redirect(`/listings/show/${id}`);
};