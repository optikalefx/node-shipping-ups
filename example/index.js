var upsAPI = require('../lib/index');
var util = require('util');

var ups = new upsAPI({
  environment: 'sandbox', // or live
  access_key: '4CC88F6EF47AD446',
  username: 'typefoo',
  password: 'a_{"R*{9;6+,%{)'
});

ups.rates({
  shipper: {
    name: 'Type Foo',
    address: {
      address_line_1: '123 Fake Address',
      city: 'Dover',
      state_code: 'OH',
      country_code: 'US',
      postal_code: '44622'
    }
  },
  ship_to: {
    name: 'Uhsem Blee',
    address: {
      address_line_1: '3456 Fake Address',
      city: 'Charlotte',
      state_code: 'NC',
      country_code: 'US',
      postal_code: '28205'
    }
  },
  packages: [
    {
      description: 'My Package',
      weight: 10
    }
  ]
}, function(err, res) {
  if(err) {
    return console.log(err);
  }
  console.log(util.inspect(res, {depth: null}));
  // should return an array of rates
});

ups.track('1ZY291F40369744809', function(err, res) {
  console.log(err);
  console.log(util.inspect(res, {depth: null}));
})