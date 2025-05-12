const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const { validateReview } = require("../middlewares/validate");
const {isLoggedIn, savedUrl, isAuthor} = require("../middlewares/auth");
const reviewController = require("../controller/reviewsC");

//Review Post Request
router.post("/", isLoggedIn, savedUrl, validateReview, wrapAsync (reviewController.reviewCreate));
  
//Review Delete Request
router.delete("/:reviewId", isLoggedIn, isAuthor, savedUrl, wrapAsync(reviewController.reviewDestroy));

module.exports = router;