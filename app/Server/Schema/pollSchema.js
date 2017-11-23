const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  options: [
    {
      name: {
        type: String,
        required: true
      },
      votes: {
        type: Number,
        default: 0
      }
    }
  ],
  date: {
    type: Date,
    required: true
  },
  user: {
    type: String,
    required: true
  }
});

const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;