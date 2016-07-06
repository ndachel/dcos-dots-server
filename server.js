'use strict';

var express = require("express"),
    mongoose = require("mongoose"),
    chalk = require('chalk'),
    querystring = require('querystring'),
    http = require('http'),
    board = require('./board.js'),
    url = require('url');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : 'root',
  password : 'dc14-@dmin',
  database : 'dotsdb',
  port     : process.env.MYSQL_PORT 
});

var app = express();

app.get("/", (request, response) => { response.end("Hello from express\n"); });

////////////////////////
// DB HEALTH CHECK
app.get("/db-test-connection", (request, response) => {
  connection.query('SELECT * FROM test_table', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
    response.end("Connection Success!\n" + "ID: " + rows[0].id + "\nName: " + rows[0].username + "\n");
  });
});

app.get('/step', (request, response) => { response.end("Next Step\n"); });

////////////////////
// GRID OPERATIONS
//   Create new grid item
app.post('/grid_new', function (req, res) {
  grid_data = '{"key":"value")';
  connection.query('INSERT INTO grid VALUES ((SELECT uuid()), ? )', grid_data, req.body,
    function(err, result) {
      if (err) throw err;
      res.send('Inserted: ' + result.insertId + '\n');
    }
  );
});

///////////////////
// GRID OPERATIONS
//   Update grid item
app.post('/grid_update', function (req, res) {
  var gameid = 'fce9f2cf-43aa-11e6-b076-0242ac110003';
  //var grid_data = '{"marble" : "madness"}';
  var grid_data = JSON.stringify(board.createBoard(3));
  connection.query('UPDATE grid SET grid_data = ? WHERE gameid = ?', [grid_data, gameid], 
    function(err, result) {
      if (err) throw err;
      res.send('Inserted: ' + result + '\n');
    }
  );
});

////////////////////
// GRID OPERATIONS
//   Get Grid data
app.get('/grid', function (req, res) {
  var queryData = url.parse(req.url, true).query;
  var gameid = queryData.gameid;  
  connection.query('SELECT * FROM grid WHERE gameid = ?', [gameid],
    function(err, rows, fields) {
      if (err) throw err;
      res.send('Data: ' + rows[0].grid_data + '\n');
    }
  );
});


app.listen(3000, "127.0.0.1", () => { console.log(`Server is listening on localhost port 3000`); });
