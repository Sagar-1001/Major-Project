web cookies - 
    Http cookies are small blocks of data created by a web server while a user is browsing 
    a website and placed on the users computer or other device by the user web browser

- State 
  1. Stateful Protcol -Stateful protocol requires server to store the status and session information.

  2. stateless Protocol - stateless protocol dose not require the server to retain the server information session information.

  - Express Sessions -
       Express sessions store the data in the temporary storage and creates a session id . This Session id is
       then stored in cookies in the website. If i use same website in different tabs different pages it will consider as single session.x
       app.use(session({ secret: "mysupersecretstring"})); - it is used for express sessions.

  - Connect- flash
  The flsah is a special area of the session used for storing messages . Messsages are written too the flash and cleared after being displayed to the user.
  
  req.flash("success", "user registered successfully ") - It is used for flash. First part is key and second part is message.

  using res.locals - it is a middleware

    app.use((req ,res, next ) => {
      res.locals.success = req.flash("success");
      next();
    })
req.flash("success", "new listing added"); - add this where you want to show flash messages

- Authentication and Authorization - 

    - Authentication - the process of verifying who someone is 
    - Authorization - The process of verifying what specific application , files and data a user has access to
   
    - Three things used for login/signup - 
      1.passport
      2.passport-local = for local strategy
      3.passport-local-mongoose = for adding usernme like things to schema
 
    - these things are used for passport - 
       app.use(passport.initialize());
       app.use(passport.session());
       passport.use(new Localstrategy(User.authenticate()));

     session is required for passport.
     const registerUser = await User.register(newUser, password); -- it is used to register user on the db.
    
     passport.authenticate("local", { 
        failureRedirect : "/login",
        failureFlash : true,
    }), -- it is used as a callback function for authenticating user id nd pass.
    
     - req.isAuthenticated() is used to authenticate user and check wether the user is logged in or not.
         if(!req.isAuthenticated())  {
         req.flash("error","You must be logged in");
        return res.redirect("/login")
}  

    - req.logout - is used to log out user.

