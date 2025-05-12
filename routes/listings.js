const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const { validateListing } = require("../middlewares/validate");
const {isLoggedIn, isOwner} = require("../middlewares/auth");
const listingController = require("../controller/listingsC");
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});


//Home & Post Route
router.route("/")
  .get(wrapAsync(listingController.listingIndex))
  .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.listingCreate));

//New Route
router.get("/new", isLoggedIn, listingController.listingNewForm);
//Show Route
router.get("/show/:id", wrapAsync(listingController.listingShow));
//Edit Route
router.get("/edit/:id", isLoggedIn, isOwner, wrapAsync(listingController.listingEdit));
//Search Route
router.post("/search", wrapAsync(listingController.listingSearch));

//Update & Delete Route
router.route("/:id")
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.listingUpdate))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.listingDestroy));

// router.get("/updatecoords", listingController.listingUpdateCoordinate);

router.get("/booking/:id", isLoggedIn, wrapAsync(listingController.listingBookingForm));

router.post("/booking/:id/payment/create", wrapAsync(listingController.listingBookingPayment));

module.exports = router;