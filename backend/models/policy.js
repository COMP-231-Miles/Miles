const mongoose = require('mongoose');
const {Schema} = mongoose;

const policySchema = new Schema({
  title : String,
  description : String
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
