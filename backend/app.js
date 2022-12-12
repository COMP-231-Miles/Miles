//app.js will hold the express app
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const testRoutes = require('./routes/test');
const userRoutes = require('./routes/user');
const carRoutes = require('./routes/car');
const reservationRoutes = require('./routes/reservation');
const policyRoutes = require('./routes/policy');

const app = express();
mongoose
  .connect(
    'mongodb+srv://milesAdmin:7VN6saOdG72gNTlA@cluster0.d0ejdlc.mongodb.net/node-miles?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//middleware to prevent CORS error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts', testRoutes);
app.use('/api/user', userRoutes);
app.use('/api/car', carRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/policy', policyRoutes);


app.use((req, res, next) => {
  res.send('Hello from express');
});

module.exports = app;
