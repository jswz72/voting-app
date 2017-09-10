'use strict';
const apiUrl = 'http://localhost:8080/api/polls';
const testApiUrl = 'http://localhost:8080/api/clicks';

function ajaxRequest(method, url, params, callback){
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
      callback(xmlhttp.response);
    }
  };
  xmlhttp.open(method, url, true);
  xmlhttp.send(JSON.stringify(params));
}

function updateClickCount(params){
  let body = {'title': params};
  ajaxRequest('POST', testApiUrl, body, data => {
    console.log(data);
  });
}

function getClickCount(){
  ajaxRequest('GET', testApiUrl, '', data => {
    console.log(data);
  })
}

function addPoll(){
  ajaxRequest('GET', apiUrl, data => {
    console.log(data);
  })
}

module.exports = {
  updateClickCount,
  getClickCount,
};
