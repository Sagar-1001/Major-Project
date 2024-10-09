const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const usercontroller = require("../controllers/user");

router.get("/signup", usercontroller.rendersignupForm);

router.post("/signup",
    wrapAsync(usercontroller.signup));

router.get("/login", usercontroller.renderLoginForm);

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
     usercontroller.login
);

router.get("/logout", usercontroller.logoutUser);


module.exports = router;

