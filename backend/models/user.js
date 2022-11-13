const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const AddressSchema = mongoose.Schema({
  city:  { type: String, required: true },
  street:  { type: String, required: true },
  province:  { type: String, required: true },
  postalCode:  { type: String, required: true },
});

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: {
    type: AddressSchema,
  },
  userType: { type: String }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);