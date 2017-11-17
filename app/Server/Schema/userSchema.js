const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    else {
      user.password = hash;
      next();
    }
  })
});

userSchema.statics.authenticate = (username, password, callback) => {
  User.findOne({ username: username })
    .exec((err, user) => {
    if (err) return callback(err);
    else if (!user) {
      let err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        return callback(null, user);
      } else {
        return callback(null, false);
      }
    })
  })
}

const User = mongoose.model('User', userSchema);
module.exports = User;