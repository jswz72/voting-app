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

function vote (pollName, voteOption) {
  return axios.post(POLL_URL + '/vote', {
    title: pollName,
    voteOption: voteOption,
    date: Date.now()
  }, {
    withCredentials: true
  }).then(res => {
    if (res.data.voted) {
      console.log('User already voted !');
    }
    return !res.data.voted;
  }).catch(err => {
    console.log(err);
  })
}

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

function authenticate (username, password) {
  return axios.post(API_URL + '/login', {
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