const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const {listingSchema, reviewSchmea} = require("./schema.js");

module.exports.isloggedIn = (req, res , next) => {
    if(!req.isAuthenticated())  {
      req.session.redirecturl = req.originalUrl;
         req.flash("error","You must be logged in");
        return res.redirect("/login")
}
   next(); 
}

module.exports.saveRedirectUrl = (req ,res ,next) => {
   if(req.session.redirecturl){
      res.locals.redirecturl =  req.session.redirecturl
   }
   next();
}

module.exports.isowner = async (req , res, next ) => {
   let {id} = req.params;
   let listing = await Listing.findById(id);
   if(!listing.owner._id.equals(res.locals.curruser._id))
   {
      req.flash("error","You are not the owner of this listing")
      return res.redirect(`/listing/${id}`);
   }
   next();
};

module.exports. validateListing = (req, res, next) => {
   let { error } = listingSchema.validate(req.body);
   if (error) {
     let errMsg = error.details.map((el) => el.message).join(",");
     throw new ExpressError(400, error);
   } else {
     next();
   }
 };

 module.exports.validatereview = (req , res , next) => {
     let {error} = reviewSchmea.validate(req.body);
     if(error){
       let errMsg = error.details.map((el) => el.message).join(",");
       throw new ExpressError(400 , error);
     }else {
       next();
     }
   };

   module.exports.isReviewAuthor = async (req , res, next ) => {
      let {id ,reviewId} = req.params;
      let  = await Review.findById(reviewId);
      if(!review.author._id.equals(res.locals.curruser._id))
      {
         req.flash("error","You are not the owner of this Review")
         return res.redirect(`/listing/${id}`);
      }
      next();
   };