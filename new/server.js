const { name } = require("ejs");
const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

app.use(session({ secret: "mysupersecretstring" , 
    resave : false,
    saveUninitialized : true,
}));
app.use(flash());

app.get("/test", (req, res) => {
    res.send("test successful!");
})

app.use("/register", (req , res ) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name; // new variables can be created in req.session
    req.flash("success", "user registered successfully ")
    res.redirect("/hello");
})

app.get("/hello", (req, res ) => {
    res.render("page.ejs", {name: req.session.name , msg : req.flash("success")});
})

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`);
  });
