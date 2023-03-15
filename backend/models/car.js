const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  name: String,
  type: String,
  passengers: Number,
  price: Number,
  luggage: Number,
  isAuto: Boolean,
  ACsup: Boolean,
  pickupLoc: String,
  image: String,
  isAvailable: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
