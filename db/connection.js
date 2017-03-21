var mongoose = require("mongoose")

var RestaurantSchema = mongoose.Schema({
  name: String,
  description: String,
  link: String,
  reviewLink: String
})

mongoose.model("Restaurant", RestaurantSchema)

mongoose.connect("mongodb://localhost/meanrestaurant", (err) => {
  if(err) {
    console.log(err)
  } else {
    console.log("MongoDB is Connected!")
  }
})

module.exports = mongoose
