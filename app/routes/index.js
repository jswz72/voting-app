'use strict'

const services = require(process.cwd() + '/app/Server/services.js');
const API_URL = '/api';
const POLL_URL = API_URL + '/polls';
//TODO RESTRUCTURE CALLS

module.exports = function (app, db) {
  const pollActions = new services.pollActions(db);
  const userActions = new services.userActions();
  app.route('/')
    .get((req, res) => {
      res.sendFile(process.cwd() + '/public/index.html');
    });
  app.route(POLL_URL)
    .get(pollActions.getPolls)
    .post(userActions.requiresAuth, userActions.getUserName, pollActions.addPoll);
  app.route(`${POLL_URL}/vote`)
    .post(userActions.requiresAuth, userActions.getUserName, userActions.checkVote, pollActions.vote, userActions.updateProfile);
  app.route(`${API_URL}/signup`)
    .post(userActions.createUser);
  app.route(`${API_URL}/login`)
    .post(userActions.authenticate);
  app.route(`${API_URL}/logout`)
    .post(userActions.logout);
};
