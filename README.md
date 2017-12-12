# RESTful CardStore (Usable but still WIP)
RESTful implementation of BusinessNetworkCardStore

Usage: 
  ```javascript
  const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
  const RestfulCardStore = require('restful-cardstore')

  let cardStore = new RestfulCardStore('http://localhost:3000/cards', options, reponseCallback);
  let businessNetworkConnection = new BusinessNetworkConnection({ cardStore: cardStore });
  ```

Default options:
  ```javascript
  // default options
  let options = {
    getPath: '',
    putPath: '',
    hasPath: '',
    getAllPath: '',
    deletePath: ''
  }

  // reponseCallback function gets called on every response
  // use this function to locate IdCard inside your response object
  // this function needs to return IdCard
  // by default callback returns response 'payload'
  let reponseCallback = function (apiResponse) {
    return apiResponse.data.payload;
  }

  let cardStore = new RestfulCardStore('your-api-url', options, reponseCallback);
  let businessNetworkConnection = new BusinessNetworkConnection({ cardStore: cardStore });

  ```
