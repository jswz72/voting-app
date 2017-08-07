'use strict'
const express = require('express');
const app = express();
const routes = require('./app/routes/index.js');

app.listen(8080, () => {
    console.log("Listening on 8080...")
})