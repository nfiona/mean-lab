var mongoose = require("./connection")
var seedData = require("./seeds.json")

var Restaurant = mongoose.model("Restaurant")

Restaurant.remove({}).then( () => {
  Restaurant.collection.insert(seedData).then( () => {
    process.exit()
  }
)
})
