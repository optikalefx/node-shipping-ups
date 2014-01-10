'use strict';

var upsAPI = require('../lib/index');
var util = require('util');
var fs = require('fs');

var ups = new upsAPI({
  environment: 'sandbox', // or live
  access_key: 'UPSACCESSKEY',
  username: 'UPSUSERNAME',
  password: 'UPSPASSWORD'
});

ups.time_in_transit({
  from: {
    city: 'Dover',
    state_code: 'OH',
    postal_code: '44622',
    country_code: 'US'
  },
  to: {
    city: 'Charlotte',
    state_code: 'NC',
    postal_code: '28205',
    country_code: 'US'
  }
}, function(err, res) {
  if(err) {
    console.log(err);
  }

  console.log(util.inspect(res, {depth: null}));
});

ups.address_validation({
  name: 'Customer Name',
  address_line_1: '123 Test Address',
  city: 'Charlotte',
  state_code: 'NC',
  postal_code: '28205',
  country_code: 'US'
}, function(err, res) {
  if(err) {
    console.log(err);
  }

  console.log(util.inspect(res, {depth: null}));
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
  if(err) {
    return console.log(err);
  }

  console.log(util.inspect(res, {depth: null}));
});

ups.confirm({
  shipper: {
    name: 'Type Foo',
    shipper_number: 'R419W8',
    address: {
      address_line_1: '123 Fake Address',
      city: 'Dover',
      state_code: 'OH',
      country_code: 'US',
      postal_code: '44622'
    }
  },
  ship_to: {
    company_name: 'Uhsem Blee',
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

  //console.log(util.inspect(res, {depth: null}));
  ups.accept(res.ShipmentDigest, function(err, res) {
    if(err) {
      return console.log(err);
    }

    fs.writeFile('./label.gif', new Buffer(res.ShipmentResults.PackageResults.LabelImage.GraphicImage, "base64"), function(err) {
      ups.void(res.ShipmentResults.ShipmentIdentificationNumber, function(err, res) {
        // {shipment_identification_number: '1Z648616E192760718'}
        if(err) {
          return console.log(err);
        }

        console.log(util.inspect(res, {depth: null}));
      })
    });
  });
});