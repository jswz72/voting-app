'use strict';
const apiUrl = 'http://localhost:8080/api/polls';
const testApiUrl = 'http://localhost:8080/api/clicks';
import axios from 'axios';

function updateClickCount (params) {
  axios.post(testApiUrl, {
    title: params
  }).then(data => {
    console.log(data);
  });
}

function getClickCount () {
  axios.get(testApiUrl).then(data => {
    console.log(data);
  });
}

function addPoll (pollName, options) {
  axios.post(apiUrl, {
    title: pollName,
    options: options
  }).then(data => {
    console.log(data);
  })
}

function getPolls () {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl).then(res => {
      resolve(res.data);
    });
  })
}

export default {
  updateClickCount,
  getClickCount,
  addPoll,
  getPolls
};
