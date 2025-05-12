const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/travel_app";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const newInitData = initData.data.map(listing => (
    {...listing, owner: "68222bd3bdb456d09036a635"}
  ));
  await Listing.insertMany(newInitData);
  console.log("data was initialized");
};

initDB();
