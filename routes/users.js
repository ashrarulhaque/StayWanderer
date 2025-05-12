const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn, savedUrl} = require("../middlewares/auth");
const userController = require("../controller/usersC");
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});

router.route("/signup")
.get(userController.userSignUpForm)
.post(userController.userSignUpPost);
  

router.route("/login")
.get(userController.userLoginForm)
.post(savedUrl, userController.userLoginPost);
  
router.get("/logout", userController.userLogout);

router.post("/update", upload.single('profileImg'), userController.userDpUpdate); 

router.get("/profile", isLoggedIn, userController.userProfile);
  
module.exports = router;
  