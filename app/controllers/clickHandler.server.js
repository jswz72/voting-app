'use strict';

function clickHandler (db) {
  const clicks = db.collection('clicks');
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

  this.vote = (req,res) => {
    const title = req.body.title
    const voteOption = req.body.voteOption;
    polls.aggregate([
      { $project: {matchedIndex: {$indexOfArray: ["$options.name", voteOption]}}}
    ], (err, result) => {
      if (err) throw err;
      const optionIndex = result[0].matchedIndex;
      const option = `$options.${optionIndex}.votes`;
      polls.findAndModify(
        {"title": title},
        { $inc: {option: 1}}
      )
    });
  }
}

module.exports = clickHandler;
