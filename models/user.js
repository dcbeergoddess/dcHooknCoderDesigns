const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const passwordComplexity = require('joi-password-complexity');
passwordComplexity().validate("aPassword123!");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true, 
    unique: true
  },
  password: passwordComplexity().required(),
});

//THIS WILL ADD username, password to schema and make sure usernames are unique --> and give us some additional methods that we can use
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);