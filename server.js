const express = require('express');
const app = express();
const port = 3000;
app.listen(port,()=>{
  console.log('server is running on',port);
})
const methodOverride = require('method-override')
const Restaurant = require ('./models/restaurants.js')
const restaurantController = require ('./controllers/restaurantController.js')
//set up mongoose
const mongoose = require('mongoose');
const mongodbURI = 'mongodb://127.0.0.1:27017/restaurant';
mongoose.connect(mongodbURI);
mongoose.connection.once('open',()=>{
  console.log('connected to mongo')
})
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.use('/restaurants',restaurantController)
app.get('/seed', async (req, res) => {
  const newRestaurants =
    [
      {
        cuisine: 'Italian',
        name: 'Salumeria Rosi',
        rating: 4,
        favDishes:['Ricotta with Peaches','Rigatoni Alla Salumeria','Trofie Al Pesto'],
        isNewRestaurant:false,
        img: './images/salumeriaRosi.jpeg'
      },
        {
          cuisine: 'Italian',
          name: 'Pappardella',
          rating: 3,
          favDishes:['Pappardelle Buttera','Cappelini Caio E Pepe'],
          isNewRestaurant:false,
          img: './images/Pappardella.jpeg'
      },
      {
          cuisine: 'Thai',
          name: 'Sala Thai',
          rating: 4.5,
          favDishes:['Pad Se-ew','Krapraw Gai Sub'],
          isNewRestaurant:false,
          img: './images/Pappardella.jpeg'
        }
        ]

  try {
    const seedItems = await Restaurant.create(newRestaurants)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})
