const mongoose = require('mongoose');
const {Schema} = mongoose;

const carSchema = new Schema({
  name:String,
  type:String,
  passengers:Number,
  price:Number,
  luggage:Number,
  isAuto:Boolean,
  ACsup:Boolean,
  pickupLoc:String,
  insurance:Number,
  imageName:String,
  isAvailable: Boolean
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
