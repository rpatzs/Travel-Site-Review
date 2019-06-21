var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")
//INDEX - show all campgrounds
 router.get("/",function(req,res)
{
//res.render("campgrounds",{campground:campgrounds});
Campground.find({},function(err,allcampgrounds)
{
    if(err)
    {
      console.log(err);
    }
    else {
       res.render("campgrounds/index",{campground:allcampgrounds,currentUser:req.user});
    }
});
});

//CREATE - add new campground to DB
router.post("/",isLoggedin,function(req,res)
{
  var name = req.body.name;
  var image = req.body.image;
  var desc=req.body.description;

  var author = {
    id:req.user._id,
    username:req.user.username
  }
  var newcampgrounds = {name:name , image:image,description:desc,author:author}

  Campground.create(newcampgrounds, function(err,campground)
    {
      if(err)
      {
        console.log(err);
      }
      else {

        campground.save();

        console.log(campground);
        res.redirect("/campgrounds");

      }
    }
  )

});
// NEW - show form to create a new campground
router.get("/new",isLoggedin,function(req,res){
res.render("campgrounds/new");
});

//SHOW - show more info about one campground
router.get("/:id",function(req,res)
{
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground)
{
  if(err)
  {
    console.log(err);
  }
  else {
    res.render("campgrounds/show",{campground:foundCampground});
  }
});

  //res.send("this will be the show page one day");

});

//Edit campground routes
router.get("/:id/edit",function(req,res)
{
  Campground.findById(req.params.id,function(err,foundCampground)
{
  if(err)
  {
    res.redirect("/campgrounds");
  }
  else {
    res.render("campgrounds/edit",{campground:foundCampground});
  }
});

}) ;

router.put("/:id",function(req,res)
{
  Campground.findOneAndReplace(req.params.id,req.body.campground,function(err,updatedcampground){
    if(err)
    {
      res.redirect("/campgrounds");
    }else {
      res.redirect("/campgrounds/" + req.params.id );
    }
  });
});
//middleware
function isLoggedin(req,res,next){
  if(req.isAuthenticated()){
    return next();

  }  res.redirect("/login");
  }
module.exports = router;
