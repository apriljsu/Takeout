const express = require ('express')
const router = express.Router()
const Restaurant = require ('../models/restaurants.js')
//index
router.get('/',async (req,res)=>{
  let restaurants = await Restaurant.find({});
  res.render('index.ejs',{restaurants});
})
//new
router.get('/new',(req,res)=>{
  res.render('new.ejs')
})
//show
router.get('/:id',async(req,res)=>{
  const restaurant = await Restaurant.findById(req.params.id);
  res.render('show.ejs',{
    restaurant:restaurant,
  })
})
//create
router.post('/',(req,res)=>{
  if(req.body.isNewRestaurant === 'on'){
    req.body.isNewRestaurant = true;
  }else{
    req.body.isNewRestaurant = false;
  }
  Restaurant.create(req.body,(err,createdRestaurant)=>{
    if(err){
      console.log('error',err)
    }
    res.redirect('/restaurants')
  })
})
//DELETE
router.delete('/:id',(req,res)=>{
  Restaurant.findByIdAndRemove(req.params.id,(err,data)=>{
    if(err){
      console.log("error",err)
    }
    res.redirect('/restaurants')
  })
})
//edit
router.get('/:id/edit',(req,res)=>{
  Restaurant.findById(req.params.id,(err,foundRestaurant)=>{
    res.render('edit.ejs',{restaurant:foundRestaurant})
  })
})
//update
router.put('/:id',(req,res)=>{
  if(req.body.isNewRestaurant === 'on'){
    req.body.isNewRestaurant = true;
  }else{
    req.body.isNewRestaurant = false;
  }
  Restaurant.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,updatedModel)=>{
    res.redirect("/restaurants")
  })
})
module.exports = router
