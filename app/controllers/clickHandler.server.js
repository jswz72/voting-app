'use strict';

function clickHandler (db) {
  const clicks = db.collection('clicks');
  const polls = db.collection('polls');

  this.addPoll = function (req, res) {
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

  this.getPolls = function (req, res) {
    polls.find({}).toArray((error, docs) => {
      if (error) throw error;
      res.send(docs);
    })
  };

  this.getClicks = function (req, res) {
    const clickProjection = { '_id': false };
    clicks.findOne({}, clickProjection, function (err, result) {
      if (err) throw err;
      if (result) {
        res.json(result);
      } else {
        clicks.insert({ 'clicks': 0 }, function (err) {
          if (err) throw err;
          clicks.findOne({}, clickProjection, function (err, doc) {
            if (err) throw err;
            res.json(doc);
          })
        })
      }
    });
  };

  this.addClick = function (req, res) {
    clicks.findAndModify(
      {},
      { '_id': 1 },
      { $inc: { 'clicks': 1 }},
      (err, result) => {
        if (err) throw err;
        res.json(result);
      }
    );
  };

  this.resetClicks = function (req, res) {
    clicks.update(
      {},
      { 'clicks': 0 },
      (err, result) => {
        if (err) throw err;
        res.json(result);
      }
    )
  }
}

module.exports = clickHandler;
