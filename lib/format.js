var format = module.exports = Object.freeze({
  json: function (data, options) {
    
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    
    return '<script> ' + options.assign + ' = ' + data + '</script>';
  },
  
  js: function (data, options) {
    
    return '<script>' + data + '</script>';
  },
  
  html: function (data, options) {
    
    return data;
  }
});