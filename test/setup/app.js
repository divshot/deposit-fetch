var express = require('express');

var app = module.exports = express();

app.get('/default', function (req, res) {
  
  res.send({default: true});
});
app.get('/js', function (req, res) {
  
  res.setHeader('content-type', 'application/javascript');
  res.send('console.log("javascript")');
});
app.get('/html', function (req, res) {
  
  res.send('<a href="">link</a>');
});
app.get('/css', function (req, res) {
  
  res.send('body{}');
});
app.get('/json', function (req, res) {
  
  res.send({type: 'json'});
});
app.get('/detected-html', function (req, res) {
  
  res.setHeader('content-type', 'text/html');
  res.send('<span>detected html</span>');
});