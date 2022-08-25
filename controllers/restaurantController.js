const express = require ('express')
const router = express.Router()
const Restaurant = require ('../models/restaurants.js')
//index
router.get('/',async (req,res)=>{
  let restaurants = await Restaurant.find({});
  res.render('index.ejs',{restaurants});
})
module.exports = router
