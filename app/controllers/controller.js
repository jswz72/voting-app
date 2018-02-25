'use strict';

import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
const POLL_URL = API_URL + '/polls';
const PROFILE_URL = API_URL + '/profile';

export default {
  addPoll,
  authenticate,
  createUser,
  getPolls,
  getProfile,
  logout,
  vote
};

function addPoll (pollName, options) {
  return axios.post(POLL_URL, {
    title: pollName,
    options: options,
    date: Date.now()
  }, {
    withCredentials: true
  }).then(res => {
    return res.data;
  }).catch(err => {
    console.log(err);
    return {};
  })
}

/**
 * Authenticate pre-created user
 *
 * @param username
 * @param password
 * @returns {Promise|Promise.<TResult>}
 */
function authenticate (username, password) {
  return axios.post(API_URL + '/login', {
    username: username,
    password: password
  }, {
    withCredentials: true
  }).then(res => {
    console.log(res);
    if (res.status === 500) {
      console.log('There was an error signing in');
      return {};
    } else if (res.status === 200 && res.data.username) {
      console.log(`Successfully signed up ${res.data.username}`);
      return res.data;
    }
  }).catch(err => {
    console.log(err);
    return {};
  })
}

function createUser (username, password) {
  return axios.post(API_URL + '/signup', {
    username: username,
    password: password
  }, {
    withCredentials: true
  }).then(res => {
    return res.data;
  }).catch(err => {
    console.log(err);
    return {};
  })
}

function getPolls () {
  return axios.get(POLL_URL, {
    withCredentials: true
  }).then(res => {
    return res.data;
  }).catch(err => {
    console.log(err);
    return {};
  })
}

function getProfile (user) {
  return axios.get(PROFILE_URL, {
    withCredentials: true
  }).then(res => {
    return res.data;
  }).catch(err => {
    console.log(err);
    return {};
  })
}

function logout () {
  return axios.post(API_URL + '/logout', {
    withCredentials: true
  }).then(res => {
    console.log(res);
    return res.data;
  }).catch(err => {
    console.log(err);
    return {};
  })
}

function vote (pollName, voteOption) {
  return axios.post(POLL_URL + '/vote', {
    title: pollName,
    voteOption: voteOption,
    date: Date.now()
  }, {
    withCredentials: true
  }).then(res => {
    return res.data;
  }).catch(err => {
    console.log('Could not log vote');
    console.log(err);
  })
}
