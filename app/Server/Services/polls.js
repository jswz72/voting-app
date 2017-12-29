const Poll = require('../Schema/pollSchema');
//TODO remove db dependecies and calls

module.exports = {

}

function addPoll (req, res) {
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

function getPolls (req, res) {
  //TODO
  polls.find({}).toArray((error, docs) => {
    if (error) throw error;
    res.send(docs);
  })
};

function vote (req, res, next) {
  const title = req.body.title;
  const voteOption = req.body.voteOption;
  //TODO
  polls.findAndModify(
    {
      'title': title,
      'options.name': voteOption
    },
    {},
    {$inc: {'options.$.votes': 1}}, (err, result) => {
      if (err) throw err;
      console.log(`logging a vote for ${title} ${result}`);
      next();
    }
  )
};