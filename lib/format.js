var DEFAULT_JSON_ASSIGNMENT = 'window.__json';

var format = module.exports = Object.freeze({
  json: function (data, options) {
    
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    
    var assign = options.assign || DEFAULT_JSON_ASSIGNMENT;
    
    return '<script>' + assign + ' = ' + data + ';</script>';
  },
  
  js: function (data, options) {
    
    return '<script>' + data + '</script>';
  },
  
  html: function (data, options) {
    
    return data;
  },
  
  css: function (data, options) {
    
    return '<style>' + data + '</style>';
  }
});