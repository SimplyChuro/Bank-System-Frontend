import ApplicationAdapter from './application';

import ENV from 'bank-system/config/environment';

export default ApplicationAdapter.extend({
  pathForType() {
    return ENV.HOST_USER;
  }
});
