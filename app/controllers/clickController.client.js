'use strict';

const apiUrl = 'http://localhost:8080/api/clicks';

function ajaxRequest(method, url, callback){
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
      callback(xmlhttp.response);
    }
  };
  xmlhttp.open(method, url, true);
  xmlhttp.send();
}

function updateClickCount(){
  ajaxRequest('POST', apiUrl, data => {
    console.log(data);
  });
}

function getClickCount(){
  ajaxRequest('GET', apiUrl, data => {
    console.log(data);
  })
}

module.exports = {
  updateClickCount,
  getClickCount,
};
