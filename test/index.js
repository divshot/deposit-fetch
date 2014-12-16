var fs = require('fs');

var test = require('tessed');
var deposit = require('deposit');
var filter = require('through2-filter');
var split = require('split');
var concat = require('concat-stream');
var express = require('express');

var fetch = require('../index');
var app = require('./setup/app');

var TEST1_FILE_PATH = __dirname + '/fixtures/test1.html';
var server;

var fetching = test('fetching:')
  .beforeEach(function (t) {
    
    server = app.listen(4321, function () {
      
      t.end();
    });
  })
  .afterEach(function (t) {
    
    server.close(function () {
      
      t.end();
    })
});

fetching.test('skip if no url is provided', function (t) {
  
  fetch()({}, function (err, data) {
    
    t.ok(err instanceof Error, 'returns error');
    t.equal(err.message, 'Url is required', 'error message');
    t.end();
  });
});

var detected = fetching.test('detected content type:');

detected.test('json', function (t) {
  
  var d = deposit();
  var expected = '<script>window.__data = {"default":true};</script>';

  d.injector('fetch', fetch());

  fs.createReadStream(TEST1_FILE_PATH)
    .pipe(split())
    .pipe(d.tree())
    .pipe(d.injectTree())
    .pipe(filter.obj(function (line) {
      
      return line.type === 'block';
    }))
    .pipe(concat({object: true}, function (lines) {
      
      var block = lines[0];
      
      t.equal(block.content.injected, expected, 'injected content');
      t.end();
    }));
});

detected.test('html', function (t) {
  
  fetch()({
    url: 'http://localhost:4321/detected-html'
  }, function (err, data) {
    
    t.equal(data, '<span>detected html</span>', 'parsed as html');
    t.end();
  });
});

fetching.test('json default assignment value: window.__json', function (t) {
  
  fetch()({
    url: 'http://localhost:4321/json'
  }, function (err, data) {
    
    t.equal(data, '<script>window.__json = {"type":"json"};</script>', 'injected as json');
    t.end();
  });
});

fetching.test('json', function (t) {
  
  fetch()({
    url: 'http://localhost:4321/json',
    type: 'application/json',
    assign: 'window.__response'
  }, function (err, data) {
    
    t.equal(data, '<script>window.__response = {"type":"json"};</script>', 'injected as json');
    t.end();
  });
});

fetching.test('javascript', function (t) {
  
  var expected = '<script>console.log("javascript")</script>';
  
  fetch()({
    url: 'http://localhost:4321/js',
    type: 'application/javascript'
  }, function (err, data) {
    
    t.equal(data, expected, 'injected as js');
    t.end();
  });
});

fetching.test('html', function (t) {
  
  fetch()({
    url: 'http://localhost:4321/html',
    type: 'text/html'
  }, function (err, data) {
    
    t.equal(data, '<a href="">link</a>', 'injected as html');
    t.end();
  });
});

fetching.test('css', function (t) {
  
  fetch()({
    url: 'http://localhost:4321/css',
    type: 'text/css'
  }, function (err, data) {
    
    t.equal(data, '<style>body{}</style>', 'injected as css');
    t.end();
  });
});

var statusCodes = fetching.test('response status codes:');

statusCodes.test('4xx returns default content', function (t) {
  
  fetch()({
    url: 'http://localhost:4321/not-found',
    default: 'default content'
  }, function (err, data) {
    
    t.equal(data, 'default content', 'returned default content');
    t.end();
  });
});