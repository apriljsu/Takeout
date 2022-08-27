require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
app.listen(port,()=>{
  console.log('server is running on',port);
})
const methodOverride = require('method-override')
const Restaurant = require ('./models/restaurants.js')
const restaurantController = require ('./controllers/restaurantController.js')
const session = require ('express-session')
const SESSION_SECRET = process.env.SESSION_SECRET
console.log('sessionsecret',SESSION_SECRET)
//set up session with secret
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
//custom middleware to make currentUser available globally
// app.use((req,res,next)=>{
//   res.locals.currentUser = req.session.currentUser
//   next()
// })
//set up mongoose
const mongoose = require('mongoose');
const mongodbURI = process.env.MONGODBURI
mongoose.connect(mongodbURI);
mongoose.connection.once('open',()=>{
  console.log('connected to mongo',mongodbURI)
})
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.use('/restaurants',restaurantController)
const userController = require ('./controllers/userController.js')
app.use('/users',userController)
app.get('/',(req,res)=>{
  res.render('home.ejs')
})
// app.get('/seed', async (req, res) => {
//   const newRestaurants =
//     [
//       {
//         cuisine: 'Italian',
//         name: 'Salumeria Rosi',
//         rating: 4,
//         favDishes:['Ricotta with Peaches','Rigatoni Alla Salumeria','Trofie Al Pesto'],
//         isNewRestaurant:false,
//         img: './images/salumeriaRosi.jpeg'
//       },
//         {
//           cuisine: 'Italian',
//           name: 'Pappardella',
//           rating: 3,
//           favDishes:['Pappardelle Buttera','Cappelini Caio E Pepe'],
//           isNewRestaurant:false,
//           img: './images/Pappardella.jpeg'
//       },
//       {
//           cuisine: 'Thai',
//           name: 'Sala Thai',
//           rating: 4.5,
//           favDishes:['Pad Se-ew','Krapraw Gai Sub'],
//           isNewRestaurant:false,
//           img: './images/Pappardella.jpeg'
//         }
//         ]
//
//   try {
//     const seedItems = await Restaurant.create(newRestaurants)
//     res.send(seedItems)
//   } catch (err) {
//     res.send(err.message)
//   }
// })
