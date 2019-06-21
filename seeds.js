var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/Comment");

var data = [
  {
     name:"Cloud's Rest",
     image:"https://www.photosforclass.com/download/flickr-3823130660",
     description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

   },
   {
      name:"Desert Mesa",
      image:"https://www.photosforclass.com/download/flickr-2770459706",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    },
    {
       name:"Canyan Floor",
       image:"https://www.photosforclass.com/download/flickr-7626464792",
       description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

     }
]
function seedDB()
{
        Campground.remove({},function(err)
          {
             if(err)
               {
                  console.log(err);
                }

          console.log("removed campgrounds!");

          data.forEach(function(seed)
            {
                Campground.create(seed,function(err,campground)
                   {
                     if(err)
                      {
                         console.log(err);
                      }
                    else {
                           console.log("added a campground");
                           Comment.create(
                             {
                                text:"This place is great but i wish there was internet",
                                author:"Homer"
                             }, function(err,comment){
                               if(err){
                                 console.log(err);
                               }
                               else {
                                 campground.comments.push(comment);
                                 campground.save();
                                 console.log("Created new comment");
                               }
                             }

                            )
                          }
                    })
            });
          });


}

module.exports=seedDB;
