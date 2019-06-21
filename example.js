var express= require("express");
var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
  name:String,age:Number,temperament:String
});
var Cat = mongoose.model("Cat",catSchema);
var george=new Cat({
  name:"george",
  age:11,
  temperament:"grouchy"
})
george.save(function(err,cat){
  if(err)
  {
    console.log("something went wrong");
  }
  else {
    console.log("we just save cat to a db");
    console.log(cat);
  }
})
app.listen(3000,function(req,res)
{
  console.log("ser");
});
