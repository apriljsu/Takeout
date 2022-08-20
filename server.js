const express = require('express');
const app = express();
const port = 3000;
app.listen(port,()=>{
  console.log('server is running on',port);
})
const methodOverride = require('method-override')
//set up mongoose
const mongoose = require('mongoose');
const mongodbURI = 'mongodb://127.0.0.1:27017/takeout';
mongoose.connect(mongodbURI);
mongoose.connection.once('open',()=>{
  console.log('connected to mongo')
})
//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride('_method'))
