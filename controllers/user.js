const User = require("../models/user");

module.exports.rendersignupForm = (req, res) => {
    res.render("user/signup");
};

module.exports.signup = async (req, res) => {

    try {
        let { username, password, email } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.flash("success", "welcome to wanderlust");
        req.login(registerUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success","welcome to wanderlust");
            res.redirect("/listing");
        })
    }
    catch (e) {
         req.flash("error", e.message);
         res.redirect("/signup");
    }
};

module.exports.renderLoginForm = async (req, res) => {
    res.render("user/login");
};

module.exports.login =  async (req, res) => {
    req.flash("success", "welcome back to Wanderlust");
    let redirecturl = res.locals.redirecturl || "listing";
    res.redirect(redirecturl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect("/listing");
    })
};