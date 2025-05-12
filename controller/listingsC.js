const { default: axios } = require("axios");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const geocode = require("../utils/geocoding");
const { response } = require("express");


module.exports.listingIndex = async (req,res) => {
  const perPage = 8; // number of listings per page
  const page = parseInt(req.query.page) || 1;

  const totalListings = await Listing.countDocuments({});
  const listingData = await Listing.find({})
    .skip((page - 1) * perPage)
    .limit(perPage);

  res.render("./listings/listings.ejs", {
    listingData,
    currentPage: page,
    totalPages: Math.ceil(totalListings / perPage)
  });
};

module.exports.listingShow = async (req,res) => {
    let {id} = req.params;
    let listInfo = await Listing.findById(id)
      .populate([
        { path: 'owner' }, // populate the owner of the listing
        {
          path: 'reviews',
          populate: {
            path: 'author' // nested populate: author of each review
          }
        }
      ]);
    if (!listInfo) {
      req.session.error = "The requested listing does not exist!";
      return res.redirect("/listings");
    };
    res.render("./listings/show.ejs", {listInfo});
};

module.exports.listingNewForm = (req,res) => {
    res.render("./listings/new.ejs");
};

module.exports.listingCreate = async (req,res,next) => {
  req.body.listing.image = {
    filename: req.file.filename,
    url: req.file.path
  } 
  req.body.listing.owner = req.user._id;
  let location = `${req.body.listing.location}, ${req.body.listing.country}`;
  req.body.listing.coordinates = await geocode(location);
  let newListing = await Listing.insertOne(req.body.listing);
  console.log(newListing)
  req.session.success = "Listing successfully created!";
  res.redirect("/listings");
};

module.exports.listingEdit = async (req,res) => {
    let {id} = req.params;
    let listInfo = await Listing.findById(id);
    if (!listInfo) {
      req.session.error = "The requested listing does not exist!";
      res.redirect("/listings");
    };
    res.render("./listings/edit.ejs", {listInfo});
};

module.exports.listingUpdate = async (req,res) => {
    let {id} = req.params;
    let location = `${req.body.listing.location}, ${req.body.listing.country}`;
    req.body.listing.coordinates = await geocode(location);
    let updatedList = await Listing.findByIdAndUpdate(id, {...req.body.listing})
    if (typeof req.file !== "undefined") {
      updatedList.image = {
        filename: req.file.filename,
        url: req.file.path
      };
      await updatedList.save();
    }
    req.session.success = "Listing successfully updated!";
    res.redirect(`/listings/show/${id}`);
};

module.exports.listingDestroy = async (req,res) => {
    let {id} = req.params;
    let deletedList = await Listing.findOneAndDelete({_id: id});
    if (!deletedList) {
      throw new ExpressError(400,"Listing not found");
    } else {
      req.session.success = "Listing successfully deleted!";
      res.redirect("/listings");
    }
};

module.exports.listingSearch = async (req, res) => {
  let { query = '', filter = {}, minPrice = 0, maxPrice = 0, sortby} = req.body;
  sortby = parseFloat(sortby);
  // Build MongoDB filter object
  let mongoQuery = {};

  if (filter.location) {
    mongoQuery.location = { $regex: query, $options: 'i' }; // Case-insensitive partial match
  };

  if (filter.country) {
    mongoQuery.country = { $regex: query, $options: 'i' };
  };

  if (filter.price) {
    if (parseFloat(minPrice) > 0 && maxPrice == '') mongoQuery.price = {$gte: parseFloat(minPrice)};
    if (parseFloat(maxPrice) > 0 && minPrice == '') mongoQuery.price = {$lte: parseFloat(maxPrice)};
    if (parseFloat(minPrice) > 0 && parseFloat(maxPrice) > 0) mongoQuery.price = {$gte: parseFloat(minPrice),$lte: parseFloat(maxPrice)};
  };

  // If no filters, search in a default field
  if (Object.keys(filter).length === 0) {
    mongoQuery.$or = [
      { location: { $regex: query, $options: 'i' } },
      { country: { $regex: query, $options: 'i' } },
    ];
  };

  const results = await Listing.find(mongoQuery).sort({price: sortby});

  if (results.length === 0) {
    req.session.error = "No search result found!";
    return res.redirect("/listings");
  }
  res.render("./listings/search", { listingData: results });
};


module.exports.listingBookingForm = async (req, res) => {
    let { id } = req.params;
    let listInfo = await Listing.findById(id);
    let userInfo = req.user;

    const data = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });

    const response = await axios.post(
      'https://api.instamojo.com/oauth2/token/',
      data,
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (!response.data) throw new ExpressError(500, 'Failed to create token');

    res.render('./listings/bookingform.ejs', {
      listInfo,
      userInfo,
      response: response.data,
    });
};

module.exports.listingBookingPayment = async (req, res) => {
  const { id } = req.params;
  const { name, email, amount, token } = req.body;

  const data = new URLSearchParams({
    amount: amount,
    purpose: 'Hotel Booking',
    buyer_name: name,
    email: email,
    // phone: '',
    redirect_url: `http://localhost:4000/listings/booking/${id}/check-payment-status?token=${token}`,
    // webhook: '',
    allow_repeated_payments: 'false',
    send_email: 'false',
    // expires_at: ''
  });

  const response = await axios.post(
    'https://api.instamojo.com/v2/payment_requests/',
    data,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'content-type': 'application/x-www-form-urlencoded',
      }
    }
  );
  if (!response) {
    throw new ExpressError(400, 'Payment request failed');
  }
  const longurl = response?.data?.payment_request?.longurl;
  if (!longurl) {
    throw new ExpressError(400, 'Payment creation failed: No longurl in response');
  }

  res.redirect(longurl);
};

// module.exports.listingUpdateCoordinate = async (req, res) => {
//   let listings = await Listing.find({});
//   for (const list of listings) {
//     let location = `${list.location}, ${list.country}`;
//     try {
//       const coords = await geocode(location);
//       console.log(coords);
//       list.coordinates = coords;
//       await list.save();
//     } catch (err) {
//       console.error(`Failed to geocode for: ${location}`, err);
//     }
//   }
//   res.send('DBs coordinate updated');
// };