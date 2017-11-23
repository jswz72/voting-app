'use strict';
const User = require('./Schema/userSchema');
const Poll = require('./Schema/pollSchema')

function pollActions (db) {
  const polls = db.collection('polls');

  this.addPoll = (req, res) => {
    console.log('yes');

    const poll = {
      title: req.body.title,
      options: req.body.options,
      date: req.body.date,
      user: req.body.userName
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
      {$inc: {'options.$.votes': 1}}, (err, result) => {
        if (err) throw err;
        console.log(`logging a vote for ${title} ${result}`);
      }
    )
  };
}

function userActions () {

  this.createUser = (req, res) => {
    let userData = {
      username: req.body.username,
      password: req.body.password,
    };

    if (!userData.username || !userData.password) return;

    User.create(userData, (err, user) => {
      if (err) throw err;
      else {
        req.session.userId = user._id;
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
        req.session.userId = user._id;
        res.send(user.username);
      } else {
        res.send();
      }
    })
  };

  this.logout = (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          throw err;
        }
        else {
          res.send(true);
        }
      })
    }
  };

  this.requiresAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      const err = new Error('Action requires authentication');
      err.status = 401;
      next(err);
    }
  };

  this.getUserName = (req, res, next) => {
    console.log('got fukn called');
    const userId = req.session.userId;
    User.getUserName(userId, (err, userName) => {
      if (err) {
        console.log(err);
        next(err);
      } else if (userName) {
        console.log(userName);
        req.body.userName = userName;
        next();
      }
    });
  };

}


module.exports = {
  pollActions,
  userActions
};
