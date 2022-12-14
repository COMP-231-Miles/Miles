const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const AddressSchema = mongoose.Schema({
  city:  { type: String },
  street:  { type: String },
  country:  { type: String },
});

const DriverLicenseSchema = mongoose.Schema({
  number:  { type: String, required: true },
  countryIssued:  { type: String, required: true },
  dateIssued:  { type: String, required: true },
});

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: {
    type: AddressSchema,
  },
  DOB: { type: String, required: true },
  userType: { type: String },
  driverLicense: {
    type: DriverLicenseSchema,
  },
  phone: { type: Number, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);