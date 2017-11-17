'use strict'
const express = require('express');
const app = express();
const routes = require('../routes/index.js');
const mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');


app.use(bodyParser.json());

mongo.connect('mongodb://localhost:27017/voting-app', (err, db) => {
    if (err) throw err;
    console.log('MongoDB successfully connected on port 27017');
    mongoose.connect('mongodb://localhost:27017/voting-app', {
        useMongoClient: true
    });
    mongoose.Promise = global.Promise;
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next()
    });
    app.use('/', express.static(process.cwd() + '/dist/'));
    app.use(session ({
      secret: 'this that',
      resave: true,
      saveUninitialized: false
    }));

    routes(app, db);
    app.listen(8080, () => {
        console.log("Listening on 8080...")
    });
});
