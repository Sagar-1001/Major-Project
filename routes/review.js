const express = require("express");
const router = express.Router({mergeParams : true});
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const{validatereview , isloggedIn , isReviewAuthor} = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js");

router.post("/",
  isloggedIn,
    validatereview,
    wrapAsync(reviewcontroller.createReview));

  // -- review delete route--
  router.delete("/:reviewId",
    isloggedIn,
    isReviewAuthor,
    wrapAsync(reviewcontroller.destroyReview)
  );

  module.exports = router;