'use strict';

function clickHandler (db) {
  const polls = db.collection('polls');

  this.addPoll = (req, res) => {
    const title = req.body.title;
    const options = req.body.options;

    polls.insertOne({
      'title': title,
      'options': options
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
  }
}

module.exports = clickHandler;
