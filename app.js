if(process.env.NODE_ENV != "production"){
require('dotenv').config()
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const Localstrategy = require("passport-local");
const User = require("./models/user.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");
const ExpressError = require("./utils/ExpressError.js");

const dburl = process.env.AtlasDb;
 
async function main() {
  await mongoose.connect(dburl);
}
main().catch(err => console.log(err));

const store = MongoStore.create({
  mongoUrl : dburl,
  crypto : {
    secret : process.env.SECRET,
  },
  touchAfter : 24 * 3600,
});

store.on("error",() => {
  console.log("Error In Mongo Session",err);
});

const sessionOpt = {
  store,
  secret : process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 24 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  },
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sessionOpt));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/demouser", async (req, res) => {
  let fakeuser = new User({
    email: "sagar111@gmail.com",
    username : "sagar1s",
  });

    let registerUser = await User.register(fakeuser, "sagar111");
    res.send(registerUser);
})

//flash messages :-
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curruser = req.user;
  next();
})

//routes
app.use("/listing", listings);
app.use("/listing/:id/reviews", reviews);
app.use("/",user);


app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));;
});

// Middlewares --
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("listing/error.ejs", { err })
  // res.status(statusCode).send(message);
});
app.use((req, res, next) => {
  res.locals.curruser = req.user; // Makes `curruser` available globally in EJS
  next();
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
