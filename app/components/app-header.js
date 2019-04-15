import Component from '@ember/component';
import { inject as service } from '@ember/service';

import ENV from 'bank-system/config/environment';
import $ from 'jquery';

export default Component.extend({
  customSession: service(),
  router: service(),
  store: service(),

  currentDate: null,

  actions: {
    async logout() {

      var _this = this;

      $.ajax({
        url: ENV.HOST_URL + '/api/v1/logout',
        type: 'POST',
        xhrFields: {
          withCredentials: true
        },
        contentType: 'application/text'
      }).always(function() {
        _this.get('customSession').clearAll();
        _this.get('router').transitionTo('index');
        _this.get('store').unloadAll('user');
        _this.set('currentDate', new Date());
      });
    }
  }
});
