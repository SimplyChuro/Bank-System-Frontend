'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'bank-system',
    environment,
    rootURL: '/',
    locationType: 'auto',
    HOST_URL: 'http://localhost:9000',
    SUB_API_ROUTE: 'api/v1',
    EmberENV: {
      FEATURES: { },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
    }
  };

  if (environment === 'development') {
    ENV.HOST_URL = 'http://localhost:9000';
    ENV.SUB_API_ROUTE = 'api/v1';
  }

  if (environment === 'production') {
    ENV.HOST_URL = 'http://localhost:9000';
    ENV.SUB_API_ROUTE = 'api/v1';
  }

  return ENV;
};
