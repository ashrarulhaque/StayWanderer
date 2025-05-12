const User = require("../models/user");
const passport = require("passport");


// GET Register form
module.exports.userSignUpForm = (req, res) => {
  if (!res.locals.currentUser) {
    return res.render("./users/signup.ejs");
  };
  if (res.locals.currentUser) {
    req.session.error = "You're already logged In";
    return res.redirect("/listings");
  };  
};

// POST Register user
module.exports.userSignUpPost = async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.session.success = `Welcome ${username}`;
        res.redirect("/listings");
      });
    } catch (e) {
      res.status(statusCode = 500).send(e);
    }
};

  // GET Login form
module.exports.userLoginForm = (req, res) => {
    if (!res.locals.currentUser) {
      return res.render("./users/login.ejs");
    };
    if (res.locals.currentUser) {
      req.session.error = "You're already logged In";
      return res.redirect("/listings");
    };
};

  // POST Login
module.exports.userLoginPost = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err); // If there's an error in the authentication process
      if (!user) {
          req.session.error = "Wrong login credentials"; // Show a flash message
          return res.redirect("/user/login"); // Redirect to login again
      }
    
      req.logIn(user, (err) => {
        if (err) return next(err); // Error during session login
  
        let redirectUrl = res.locals.redirectUrl || "/listings"
        req.session.success = `Welcome back ${user.username}!`; // Success message
        return res.redirect(redirectUrl); // Redirect to your desired page
      });
    })(req, res, next); // Immediately call the middleware
};

// GET Logout
module.exports.userLogout = (req, res) => {
  req.logout(() => {
    req.session.success = "You've been logged out!";
    res.redirect("/listings");
  });
};

module.exports.userDpUpdate = async (req,res) => {
  let id = req.user._id;
  let orginalUrl = req.file.path;
  let userInfo = await User.findById(id);
  if (userInfo) {
    userInfo.profileImg = {
      filename: req.file.filename,
      url: orginalUrl
    }
    await userInfo.save();
    req.session.success = "Your profile picture has been updated!"
    return res.redirect("/listings");
  }
  if (!userInfo) {
    req.session.error = "Please login to update your profile";
    return res.redirect("/listings");
  }
};

module.exports.userProfile = (req,res) => {
  let userInfo = req.user;
  res.render("./users/profile.ejs", {userInfo});
}