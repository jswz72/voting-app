'use strict';
const schema = require('./mongooseSchema');

function clickHandler (db) {
  const polls = db.collection('polls');

  this.addPoll = (req, res) => {
    const title = req.body.title;
    const options = req.body.options;
    const date = req.body.date;
    polls.insertOne({
      'title': title,
      'options': options,
      'date': date
    }, (err, result) => {
      if (err) throw err;
      res.json(result);
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

    schema.User.create(userData, (err, user) => {
      if (err) throw err;
      else {
        res.send(user);
      }
    })
  };

  this.authenticate = (req, res) => {
    let username = req.body.username,
      password = req.body.password;
    schema.User.authenticate(username, password, (err, user) => {
      if (err) throw err;
      else {
        res.send({authenticated: true});
      }
    })
  }
}

module.exports = clickHandler;
