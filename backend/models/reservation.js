const mongoose = require('mongoose');
const {Schema} = mongoose;
const Car = require('./car');
const User = require('./user');

const reservationSchema = new Schema({
  userID : String,
  carID : String,
  fromDate : Date,
  toDate : Date,
  location: String,
  price: Number,

});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
