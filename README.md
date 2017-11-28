# RESTful CardStore
RESTful implementation of BusinessNetworkCardStore

Usage: 
  ```javascript
  const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
  const RestfulCardStore = require('restful-cardstore')

  let cardStore = new RestfulCardStore();
  let businessNetworkConnection = new BusinessNetworkConnection({ cardStore: cardStore });
  ```

Default options:
  ```javascript
  // default options
  let options = {
    baseUrl: 'http://localhost:3000',
    getPath: '',
    putPath: '',
    hasPath: '',
    getAllPath: '',
    deletePath: ''
  }

  /**
   * @param {Response} apiResponse
   * @return {IdCard} IdCard
   */
  let cb = function (apiResponse) {
    // callback function needs to return IdCard from response object you get from your API
    // by default callback returns payload
    return apiResponse.data.payload;
  }

  let cardStore = new RestfulCardStore();
  let businessNetworkConnection = new BusinessNetworkConnection({ cardStore: cardStore });

  ```
