'use strict'
const express = require('express');
const app = express();
const routes = require('./app/routes/index.js');
const mongo = require('mongodb').MongoClient;


mongo.connect('mongodb://localhost:27017/voting-app', function (err, db){
    if (err) throw err;
    console.log('MongoDB successfully connected on port 27017');
    app.use('/', express.static(process.cwd() + '/dist/'));
    routes(app, db);
    app.listen(8080, () => {
        console.log("Listening on 8080...")
    });
});
