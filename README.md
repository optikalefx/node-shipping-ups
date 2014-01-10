#shipping-ups

## Install

`npm install shipping-ups`

## Usage

```js
  var upsAPI = require('shipping-ups');

  var ups = new upsAPI({
    environment: 'sandbox', // or live
    username: 'UPSUSERNAME',
    password: 'UPSPASSWORD',
    access_key: 'UPSACCESSTOKEN',
    imperial: true // set to false for metric
  });

  ups.track(..., function(err, result) {
    if(err) {
      console.log(err);
    }

    console.log(result);
  });

  ups.rate(..., function(err, result) {
    ...
  });

  // Generate a Digest for a specific Rate
  ups.confirm(..., function(err, result) {
    ...
  });

  // Purchase the Label
  ups.accept(..., function(err, result) {
    ...
  });

  // Void the Shipment
  ups.void(..., function(err, result) {
    ...
  });
```

See `example/index.js` for a working sample.

## License

(The MIT License)

Copyright 2014 uh-sem-blee, Co. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.