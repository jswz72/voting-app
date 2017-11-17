'use strict'

const ClickHandler = require(process.cwd() + '/app/Server/clickHandler.server.js')
const API_URL = '/api';
const POLL_URL = API_URL + '/polls';

module.exports = function (app, db) {
  const clickHandler = new ClickHandler(db);
  app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/index.html');
    });
  app.route(POLL_URL)
    .get(clickHandler.getPolls)
    .post(clickHandler.addPoll);
  app.route(`${POLL_URL}/vote`)
    .post(clickHandler.vote);
  app.route(`${API_URL}/signup`)
    .post(clickHandler.createUser);
  app.route(`${API_URL}/login`)
    .post(clickHandler.authenticate);
};
