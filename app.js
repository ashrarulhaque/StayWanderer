require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const path = require('path');
const listingsRoute = require("./routes/listings");
const reviewsRoute = require("./routes/reviews");
const usersRoute = require("./routes/users");
const Listing = require("./models/listing");
const engine = require('ejs-mate');
const ExpressError = require("./utils/ExpressError");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const { error } = require('console');


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', engine);

let mongoURL = process.env.DATABASE_URL;
//Mongoose Connection initialisation
main()
  .then(() => {
      console.log("connection established");
    })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoURL);
};

const store = MongoStore.create({
  mongoUrl: mongoURL,
  ttl: 14 * 24 * 60 * 60, // = 14 days. Default
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24*60*60,
  
});
store.on("error", () => {
  console.log("ERROR in Mongo Session Store", err);
});

//Express-session Middleware
const sessionOption = {
  store: store, 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};


app.use(session(sessionOption));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//locals Middleware
app.use((req, res, next) => {
  res.locals.success = req.session.success || null;
  res.locals.error = req.session.error || null;
  res.locals.currentUser = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  delete req.session.success;
  delete req.session.error;
  next();
});


//Index Route
app.get("/", async (req, res) => {
    const randomListing = await Listing.aggregate([{ $sample: { size: 6} }]);
    if (randomListing.length === 0) {
      return randomListing = [
        {
          title: 'Desert Oasis in Dubai',
          description: 'Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.',
          image: {
            url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
          },
          price: '$150',
        }
      ];
    };
    console
    res.render('./index.ejs', { randomListing });
  }
);


//Middleware to link all listing routes
app.use("/listings", listingsRoute);
//Middleware to link all review routes
app.use("/listings/:id/reviews", reviewsRoute);
//Middleware to link all user routes
app.use("/user", usersRoute);



//PAGE NOT FOUND Error
app.all ("*", (req,res,next) => {
  next(new ExpressError (404, "PAGE NOT FOUND !"));
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  let {statusCode = 500, message = "Something went wrong"} = err;
  res.status(statusCode).render("./listings/error.ejs", {err});
});

//Server initialization
app.listen(process.env.PORT, () => {
    console.log('server is listening')}
  );