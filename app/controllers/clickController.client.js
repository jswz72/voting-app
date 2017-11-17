'use strict';
import axios from 'axios';
const API_URL = 'http://localhost:8080/api';
const POLL_URL = API_URL + '/polls'

function vote (pollName, voteOption) {
  return axios.post(POLL_URL + '/vote', {
    title: pollName,
    voteOption: voteOption
  }).then(data => {
    return data;
  }).catch(err => {
    console.log(err);
    return {};
  })
}

function addPoll (pollName, options) {
  return axios.post(POLL_URL, {
    title: pollName,
    options: options,
    date: Date.now()
  }).then(res => {
    return res.data;
  }).catch(err => {
    console.log(err);
    return {};
  })
}

function getPolls () {
  return axios.get(POLL_URL).then(res => {
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
  }).then(res => {
    return res.data;
  }).catch(err => {
    console.log(err);
    return {};
  })
}

export default {
  vote,
  addPoll,
  getPolls,
  authenticate,
  createUser
};
