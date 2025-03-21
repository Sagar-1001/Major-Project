const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");  // Make sure this path is correct

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
  console.log("connection successful");
};

const initDB = async () => {
  initdata.data = initdata.data.map( (obj) => ({
    ...obj,
    owner: "66dec3e0421e19ca58612895"
  }))
    await Listing.insertMany(initdata.data);
    console.log("added");
};

    

const addDB = async () => {
  // await Listing.deleteMany({});
  await Listing.insertMany(initdata.data);
  console.log("Records Initialized");
};

addDB();
// initDB();
