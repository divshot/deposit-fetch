var request = require('request');
var mime = require('mime-types');

var format = require('./lib/format');

module.exports = function (spec) {
  
  return function fetch (options, done) {
  
    if (!options.url) {
      return done(new Error('Url is required'));
    }
    
    request.get(options.url, function (err, response, body) {
      
      if (err) {
        return done(err);
      }
      
      if (response.statusCode >= 400) {
        return done(null, options.default);
      }
      
      var type = options.type || response.headers['content-type'];
      var ext = mime.extension(type);
      var data = format[ext](body, options);
      
      done(null, data);
    });  
  };
};