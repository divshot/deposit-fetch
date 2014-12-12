var fetch = require('../index');
var deposit = require('deposit');
var Mocksy = require('mocksy');
var server = new Mocksy({port: 4321});

var TEST1_FILE_PATH = __dirname + '/fixutres/test1.html';

/*

var d = deposit();

d.injector('fetch', fetch);

d.parse(TEST1_FILE_PATH, function (err, content) {
  
});
 */