let mongoose = require('mongoose');

// reference passport-local-mongoose to make this model usable for managing Users
let plm = require('passport-local-mongoose');

// create the model schema.  username and password are included automatically
let accountSchema = new mongoose.Schema({});

accountSchema.plugin(plm);

module.exports = mongoose.model('Account', accountSchema);