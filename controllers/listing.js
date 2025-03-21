const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const lists = await Listing.find({});
  res.render("listing/index", { lists });
};

module.exports.rendernewForm = (req, res) => {
  res.render("listing/new");
};

module.exports.createListing = async (req, res, next) => {
   let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  })
 .send()
  // Ensure this matches the form action
  let url = req.file.path;
  let filename = req.file.filename;
  let newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = { url, filename };

 newlisting.geometry =  response.body.features[0].geometry;

 let savelisting = await newlisting.save();
 console.log(savelisting);
  req.flash("success", "new listing added");
  res.redirect("/listing");
};

module.exports.renderEditform = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listing/edit", { listing });
};

module.exports.EditListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing added");
  res.redirect(`/listing/${id}`);
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });

  if (!listing) {
    req.flash("error", "The listing you requested does not exist.");
    return res.redirect("/listing");
  }

  res.render("listing/show", { listing, curruser: req.user }); // Pass curruser explicitly
};


module.exports.destrotListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", " listing deleted")
  res.redirect("/listing");
};