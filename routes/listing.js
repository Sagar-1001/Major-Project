  const express = require("express");
  const router = express.Router();
  const wrapAsync = require("../utils/wrapAsync");
  const {isloggedIn , isowner, validateListing} = require("../middleware.js");
  const listingController = require("../controllers/listing.js"); 
  const multer  = require('multer');
  const {storage} = require("../cloudconfig.js");
  const upload = multer({ storage  })
  

  // Index Route
  router.get("", wrapAsync(listingController.index));

  // New Route
  router.get("/new", isloggedIn ,listingController.rendernewForm);

  // Create Route
  router.post("/",
    isloggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
    );

  // Edit Route
  router.get("/:id/edit",isloggedIn,isowner, wrapAsync(listingController.renderEditform));

  //Update Route
  router.put("/:id",
    isloggedIn,
    isowner,
    upload.single("listing[image]"), 
    validateListing,
    wrapAsync(listingController.EditListing));

  // Show Route
  router.get("/:id",   wrapAsync(listingController.showListing));

  // Delete Route
  router.delete("/:id", isloggedIn,isowner,wrapAsync(listingController.destrotListing));

  module.exports = router;