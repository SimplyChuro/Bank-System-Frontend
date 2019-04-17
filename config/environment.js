'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'bank-system',
    environment,
    rootURL: '/',
    locationType: 'auto',
    HOST_URL: 'http://localhost:9000',
    SUB_API_ROUTE: 'api/v1',
    HOST_USER: 'user',
    HOST_DEPOSIT: 'deposit',
    HOST_WITHDRAWAL: 'withdrawal',
    HOST_PAYMENT: 'payment',
    HOST_PICTURE: 'picture',

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
  }

  if (environment === 'production') {
    ENV.HOST_URL = 'http://localhost:9000';
  }

  return ENV;
};
