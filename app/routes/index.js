'use strict'

const services = require(process.cwd() + '/app/Server/Services/index');
const API_URL = '/api';
const POLL_URL = API_URL + '/polls';
const PROFILE_URL = API_URL + '/profile';

module.exports = function (app, db) {
  app.route('/')
    .get((req, res) => {
      res.sendFile(process.cwd() + '/public/index.html');
    });
  app.route(POLL_URL)
    .get(services.poll.getPolls)
    .post(services.user.requiresAuth, services.user.getUserName, services.poll.addPoll);
  app.route(`${POLL_URL}/vote`)
    .post(services.user.requiresAuth, services.user.getUserName, services.user.checkVote, services.poll.vote, services.user.updateProfile);
  app.route(`${API_URL}/signup`)
    .post(services.user.createUser);
  app.route(`${API_URL}/login`)
    .post(services.user.authenticate);
  app.route(`${API_URL}/logout`)
    .post(services.user.logout);
  app.route(PROFILE_URL)
    .get(services.user.requiresAuth, services.user.getUserName, services.user.getProfile);
};
