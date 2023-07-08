// models/formModel.js

const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const formSchema = new mongoose.Schema({
  name: String,
  email: String, // Updated field name to "email"
  password: String,
});

// bcrypt password code 
formSchema.pre('save', function (next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});




formSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isVaild) {
    if (err) return cb(err);
    cb(null, isVaild);
  });
};

module.exports = mongoose.model('Form', formSchema);
