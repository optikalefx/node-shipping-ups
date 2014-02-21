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

  ups.time_in_transit(..., function(err, res) {
    ...
  });

  ups.address_validation(..., function(err, result) {
    ...
  });

  ups.track(..., function(err, result) {
    ...
  });

  ups.rates(..., function(err, result) {
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

### new upsAPI(options)

Initialize your API bindings

```js
  options = {
    imperial: true, // for inches/lbs, false for metric cm/kgs
    currency: 'USD',
    environment: 'sandbox',
    access_key: '',
    username: '',
    password: '',
    pretty: false,
    user_agent: 'uh-sem-blee, Co | typefoo',
    debug: false
  }
```

### time_in_transit(data, callback)

Calculate the time in transit for a shipment

```js
  data = {
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
    },
    weight: 10, // set imperial to false for KGS
    pickup_date: 'YYYYMMDD',
    total_packages: 1, // number of packages in shipment
    value: 999999999.99, // Invoice value, set currency in options
  }
```

### address_validation(data, callback)

Validates an address

```js
  data = {
    request_option: 3, // 1, 2, or 3 per UPS docs
    // 1 - Address Validation
    // 2 - Address Classification
    // 3 - Address Validation and Address Classification.
    name: 'Customer Name',
    company: 'Company Name',
    address_line_1: 'Address Line 1',
    address_line_2: 'Address Line 2',
    address_line_3: 'Address Line 3',
    city: 'Dover',
    state_code: 'OH',
    postal_code: '44622',
    country_code: 'US'
  }
```

### track(tracking_number, [options], callback)

Get a shipment's tracking information with `tracking_number` as the ID

```js
  options = {
    latest: true // default false, will get only the latest tracking info, otherwise retrieves history
  }
```

### rates(data, callback)

Get a list of shipping rates

```js
  data = {
    pickup_type: 'daily_pickup', // optional, can be: 'daily_pickup', 'customer_counter', 'one_time_pickup', 'on_call_air', 'suggested_retail_rates', 'letter_center', 'air_service_center'
    pickup_type_code: '02', // optional, overwrites pickup_type
    customer_classification: '00', // optional, need more details about what this does
    shipper: {
      name: 'Type Foo',
      shipper_number: 'SHIPPER_NUMBER', // optional, but recommended for accurate rating
      phone_number: '', // optional
      address: {
        address_line_1: '123 Fake Address',
        city: 'Dover',
        state_code: 'OH',
        country_code: 'US',
        postal_code: '44622'
      }
    },
    ship_to: {
      name: 'John Doe', // optional
      company_name: 'Uhsem Blee',
      attention_name: '', // optional
      phone_number: '', // optional
      address: {
        address_line_1: '3456 Fake Address', // optional
        city: 'Charlotte', // optional
        state_code: 'NC', // optional, required for negotiated rates
        country_code: 'US',
        postal_code: '28205'
      }
    },
    ship_from: { // optional, use if different from shipper address
      name: 'Alternate Name',
      phone_number: '', // optional
      address: {
        address_line_1: '123 Fake Address',
        city: 'Dover',
        state_code: 'OH',
        country_code: 'US',
        postal_code: '44622'
      }
    },
    service: '03' // optional, will rate this specific service.
    services: [ // optional, you can specify which rates to look for -- performs multiple requests, so be careful not to do too many
      '03'
    ],
    packages: [
      {
        packaging_type: '02', // optional, packaging type code
        weight: 10,
        description: 'My Package', // optional
        delivery_confirmation_type: 2, // optional, 1 or 2
        insured_value: 1000.00, // optional, 2 decimals
        dimensions: { // optional, integers: 0-108 for imperial, 0-270 for metric
          length: 12,
          width: 12,
          height: 24
        }
      }
    ]
  }
```

### confirm(data, callback)

Pick a shipping rate

```js
  data = {
    service_code: '03', // required for selected rate
    pickup_type: 'daily_pickup', // optional, can be: 'daily_pickup', 'customer_counter', 'one_time_pickup', 'on_call_air', 'suggested_retail_rates', 'letter_center', 'air_service_center'
    pickup_type_code: '02', // optional, overwrites pickup_type
    customer_classification: '00', // optional, need more details about what this does
    shipper: {
      name: 'Type Foo',
      shipper_number: 'SHIPPER_NUMBER', // required here until another Billing Method enabled
      phone_number: '', // optional
      address: {
        address_line_1: '123 Fake Address',
        city: 'Dover',
        state_code: 'OH',
        country_code: 'US',
        postal_code: '44622'
      }
    },
    ship_to: {
      name: 'John Doe', // optional
      company_name: 'Uhsem Blee',
      attention_name: '', // optional
      phone_number: '', // optional
      address: {
        address_line_1: '3456 Fake Address',
        city: 'Charlotte',
        state_code: 'NC',
        country_code: 'US',
        postal_code: '28205'
      }
    },
    ship_from: { // optional, use if different from shipper address
      name: 'Alternate Name',
      phone_number: '', // optional
      address: {
        address_line_1: '123 Fake Address',
        city: 'Dover',
        state_code: 'OH',
        country_code: 'US',
        postal_code: '44622'
      }
    },
    packages: [ // at least one package is required
      {
        packaging_type: '02', // optional, packaging type code
        weight: 10,
        description: 'My Package', // optional
        delivery_confirmation_type: 2, // optional, 1 or 2
        insured_value: 1000.00, // optional, 2 decimals
        dimensions: { // optional, integers: 0-108 for imperial, 0-270 for metric
          length: 12,
          width: 12,
          height: 24
        }
      }
    ]
  }
```

### accept(shipment_digest, callback)

Purchase a shipping label and tracking number

```js
  shipment_digest = 'SHIPMENTDIGEST'; // big data string
```

### void(data, callback)

```js
  data = '1ZTRACKINGNUMBER';
```

OR

```js
  data = {
    shipment_identification_number: '1ZSHIPMENTIDNUMBER',
    tracking_numbers: ['1ZTRACKINGNUMBER', '1ZTRACKINGNUMBER'] // optional
  }
```

Void a previously created order

See `example/index.js` for a working sample.

## License

(The MIT License)

Copyright 2014 uh-sem-blee, Co. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.