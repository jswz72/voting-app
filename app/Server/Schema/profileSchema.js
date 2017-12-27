
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  //polls user has voted on and vote history
  votes: [
    {
      poll: {
        type: String,
        required: true
      },
      vote: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: false
      }
    }
  ]
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;