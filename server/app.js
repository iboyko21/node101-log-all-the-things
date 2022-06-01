const { timeStamp } = require('console');
const express = require('express');
const fs = require('fs'); // file management
const csv = require('csvtojson');
const app = express();

app.use((req, res, next) => {
// write your logging code here
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
// write your code to respond "ok" here
res.status(200).send("ok");
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
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