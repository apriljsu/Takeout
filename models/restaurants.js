const mongoose = require ('mongoose')
const restaurantSchema = new mongoose.Schema({
  name:{type:String, required:true},
  cuisine:{type:String,required:true},
  rating:{type:Number,required:true},
  favDishes:[],
  isNewRestaurant:Boolean
})
const Restaurant = mongoose.model('Restaurant',restaurantSchema)
module.exports = Restaurant;
