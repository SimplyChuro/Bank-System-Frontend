import { inject as service } from '@ember/service';

import DS from 'ember-data';
import ENV from 'bank-system/config/environment';

export default DS.RESTAdapter.extend({
  customSession: service(),
  host: ENV.HOST_URL,
  namespace: ENV.SUB_API_ROUTE,

  ajax(url, method, hash = {}) {
    hash.xhrFields = { withCredentials: true };
    
    return this._super(url, method, hash);
  } 

});