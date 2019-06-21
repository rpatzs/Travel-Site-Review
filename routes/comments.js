var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/Comment");
//comments new
router.get("/new",isLoggedin,function(req,res)
{


    Campground.findById(req.params.id,function(err,campground)
  {
    if(err)
    {
      console.log(err);
    }
    else {
      //console.log(campground);
        res.render("comments/new",{campground:campground});
    }
  });

});
//comments create
router.post("/",isLoggedin,function(req,res)
{
  //lookup campground using id
    Campground.findById(req.params.id,function(err,campground)
  {
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
       Comment.create(req.body.comment,function(err,comment)
     {
       if(err)
       {
         console.log(err);
       }
       else {
         //add username and id to comment
          comment.author.id= req.user._id;
          comment.author.username=req.user.username;
         //save comment
         comment.save();
         campground.comments.push(comment);
         campground.save();
         res.redirect('/campgrounds/'+ campground._id);
       }
     })
    }
  });
});
//middleware
function isLoggedin(req,res,next){
  if(req.isAuthenticated()){
    return next();

  }  res.redirect("/login");
  }

module.exports= router;
