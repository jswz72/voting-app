'use strict';
const apiUrl = 'http://localhost:8080/api/polls';
import axios from 'axios';

function vote (pollName, voteOption) {
  axios.post(apiUrl + '/vote', {
    title: pollName,
    voteOption: voteOption
  }).then(data => {
    console.log(data);
  });
}

function addPoll (pollName, options) {
  axios.post(apiUrl, {
    title: pollName,
    options: options,
    date: Date.now()
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
  vote,
  addPoll,
  getPolls
};
