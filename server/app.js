const express = require('express');
const fs = require('fs');
const csv = require('csvtojson');

const app = express();

app.use((req, res, next) => {
// logging code
let agent = req.header("User-Agent").replace(/,/g, '');
let time = new Date().toISOString();
let method = req.method;
let resource = req.url;
let version = `HTTP/${req.httpVersion}`;
let status = res.statusCode;
let logEntry = `\n${agent},${time},${method},${resource},${version},${status}`;
console.log(logEntry);

fs.appendFile('log.csv', logEntry, function(err){
    if(err) throw err;
});
next();
});

app.get('/', (req, res) => {
// respond "ok" to status code 200
res.status(200).send("ok");
});

app.get('/logs', (req, res) => {
// return a json object containing the log data
    csv()
    .fromFile('log.csv')
    .then((jsonObj) => {
        res.json(jsonObj);
    });
});

app.get('*', (req, res) => {
    res.status(404).send("Not Found");
    });

module.exports = app;