'use strict';
const User = require('./Schema/userSchema');
const Poll = require('./Schema/pollSchema')

function clickHandler (db) {
  const polls = db.collection('polls');

  this.addPoll = (req, res) => {
    const poll = {
      title: req.body.title,
      options: req.body.options,
      date: req.body.date
    };

    Poll.create(poll, (err, poll) => {
      if (err) throw err;
      else {
        res.json(poll);
      }
    });
  };

  this.getPolls = (req, res) => {
    polls.find({}).toArray((error, docs) => {
      if (error) throw error;
      res.send(docs);
    })
  };

  this.vote = (req, res) => {
    const title = req.body.title;
    const voteOption = req.body.voteOption;
    polls.findAndModify(
      {
        'title': title,
        'options.name': voteOption
      },
      {},
      { $inc: { 'options.$.votes': 1 }}, (err, result) => {
        if (err) throw err;
        console.log(`logging a vote for ${title} ${result}`);
      }
    )
  };

  this.createUser = (req, res) => {
    let userData = {
      username: req.body.username,
      password: req.body.password,
    };

    if (!userData.username || !userData.password) return;
    console.log(userData.username, userData.password);

    User.create(userData, (err, user) => {
      if (err) throw err;
      else {
        res.send(user.username);
      }
    })
  };

  this.authenticate = (req, res) => {
    let username = req.body.username,
      password = req.body.password;
    User.authenticate(username, password, (err, user) => {
      if (err) {
        console.log(err);
        res.send();
      }
      else if (user) {
        res.send(user.username);
      } else {
        res.send();
      }
    })
  }
}

module.exports = clickHandler;
