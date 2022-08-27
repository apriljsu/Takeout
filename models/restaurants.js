const mongoose = require ('mongoose')
const restaurantSchema = new mongoose.Schema({
  cuisine:{type:String,required:true},
  name:{type:String, required:true},
  rating:{type:Number,required:true},
  favDish:String,
  img:String
})
const Restaurant = mongoose.model('Restaurant',restaurantSchema)
module.exports = Restaurant;
