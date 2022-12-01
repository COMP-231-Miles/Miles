const mongoose = require('mongoose');
const {Schema} = mongoose;
const Car = require('./car');
const User = require('./user');

const reservationSchema = new Schema({
  userID : string,
  carID : string,
  fromDate : Date,
  toDate : Date,
  location: string,
  price: Number,

});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
