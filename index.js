'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const indexPath = path.join(__dirname, 'www/app/index.html');
const publicPath = express.static(path.join(__dirname, '../dist'));

app.use('/dist', publicPath);
app.get('/', function (_, res) { res.sendFile(indexPath) });
app.use(bodyParser.json());

const CLOUD_PORT = 8000;
app.listen(CLOUD_PORT, function() {
  console.log('cloud app started on port: ' + CLOUD_PORT);
});
