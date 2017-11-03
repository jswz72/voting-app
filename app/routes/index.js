'use strict'

const ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js')
const apiUrl = '/api/polls';

module.exports = function (app, db) {
  const clickHandler = new ClickHandler(db);
  app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
    });
  app.route(apiUrl)
    .get(clickHandler.getPolls)
    .post(clickHandler.addPoll);
  app.route('/api/polls/vote')
    .post(clickHandler.vote);
};
