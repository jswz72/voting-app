'use strict'

const ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js')

module.exports = function (app, db) {
  const clickHandler = new ClickHandler(db);
  app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
    });
  app.route('/api/clicks')
    .get(clickHandler.getClicks)
    .post(clickHandler.addClick)
    .delete(clickHandler.resetClicks);
  app.route('/api/polls')
    .get(clickHandler.getPolls)
    .post(clickHandler.addPoll);
};
