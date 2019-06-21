var express = require("express"),
app = express(),
bodyparser = require("body-parser"),
mongoose = require("mongoose"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
Campground = require("./models/campground"),
seedDB = require("./seeds"),
User   = require("./models/user"),
Comment = require("./models/Comment"),
methodOverride = require("method-override")
//seedDB();
//requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp");
mongoose.set('useNewUrlParser', true);
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static("views"));
app.use(express.static(__dirname + "/public"));
app.set( "view engine","ejs");
mongoose.Types.ObjectId.isValid('your id here');
app.use(methodOverride("_method"));
//PASSPORT CONFIGURATON
app.use(require("express-session")({
    secret:"once again rusty wins the cutest dog",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next)
{
  res.locals.currentUser = req.user;
  next();
});




//=============
//AUTH ROUTES
//=============

//show register form

app.use(authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

 app.listen(3000,function()
 {
   console.log("server is listening");
   console.log("d sbjjdhjbcdbhb");
 })
