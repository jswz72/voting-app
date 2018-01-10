const User = require('../Schema/userSchema');
const Profile = require('../Schema/profileSchema');

module.exports = {
  authenticate,
  checkVote,
  createUser,
  getUserName,
  getProfile,
  logout,
  requiresAuth,
  updateProfile,
};

/**
 * Authenticate pre-created user.  Add id to session if found.
 * Return empty if username/password failure, return username if successful.
 *
 * @param req
 * @param res
 */
function authenticate (req, res) {
  let username = req.body.username,
    password = req.body.password;
  User.authenticate(username, password, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }
    else if (user) {
      req.session.userId = user._id;
      res.send({username: user.username});
    } else {
      res.status(401).send();
    }
  })
};

function checkVote (req, res, next) {
  const userName = req.body.userName,
    title = req.body.title;
  Profile.getVote(userName, title, (err, result) => {
    if (err) {
      console.log(err);
      return err;
    }
    else {
      console.log(result);
      if (!result) {
        next();
      } else {
        res.send({ voted: true });
      }
    }
  });
}

function createUser (req, res) {
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

function getUserName (req, res, next) {
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

function getProfile (req, res) {
  Profile.findOne({
    userName: req.body.userName
  }, (err, result) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log(result);
      if (!result) {
        res.send(result);
      } else {
        res.send(result.votes);
      }
    }
  })
}

function logout (req, res) {
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

function requiresAuth (req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    const err = new Error('Action requires authentication');
    err.status = 401;
    next(err);
  }
};

function updateProfile (req, res) {
  const data = {
    title: req.body.title,
    voteOption: req.body.voteOption,
    userName: req.body.userName,
    date: req.body.date
  }
  Profile.findOneAndUpdate({ 'userName': data.userName },
    {
      $push: {
        votes: {
          poll: data.title,
          vote: data.voteOption,
          date: data.date
        }
      }
    },(err, result) => {
      if (err) return err;
      console.log('profile update result');
      console.log(result);
      if (!result) {
        console.log('wer made it');
        Profile.create({
          userName: data.userName,
          votes: [
            {
              poll: data.title,
              vote: data.voteOption,
              date: data.date
            }
          ]
        }, (err, result) => {
          if (err) {
            console.log(err);
            return err;
          }
          console.log('Created profile for user: ' + data.userName);
          res.send(result);
        });
      }
      else {
        res.send(result);
      }
    }
  );
};
