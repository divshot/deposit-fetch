# deposit-fetch

[Deposit](https://github.com/divshot/deposit) injector to fetch remote content

## Install

```
npm install deposit-fetch --save
```

## Usage

**server**

```js
var http = require('http');
var deposit = require('deposit');

var d = deposit();

d.injector('fetch', require('deposit-fetch')());

http.createServer(function (req, res) {

  fs.createReadStream('/path/to/some/file.html')
    .pipe(d)
    .pipe(res);

}).listen(3000);
```

**file.html**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">

</head>
<body>

  <!-- inject:fetch url=http://some.site.com/page.json timeout=5 assign=window.__content -->
  <script>
  	window.__content = {}; // This is default data
  </script>
  <!-- endinject -->

</body>
</html>
```

**file.html** with fetched content

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">

</head>
<body>

  <script>window.__content = {responseData: 'something here'};</script>

</body>
</html>
```

## Injection Options

* `url` - The url to fetch.
* `assign` - OPTIONAL - The value to assign the response body to. This is only used if it is a JSON response. *html* responses are injected as is, *css* responses are wrapped in *style* tags, *javascript* responses are wrapped in *script* tags, and *json* responses are wrapped in script tags and assigned to value given in the *assign* options. If now value is set for *assign*, `window.__json` is used by default.
* `type` - OPTIONAL - Force the content type of the response. Defaults to the the `content-type` header in the response.
* `timeout` - OPTIONAL - Request timeout in seconds. Defaults to 10 seconds.

## Run Tests

```
npm install
npm test
```
