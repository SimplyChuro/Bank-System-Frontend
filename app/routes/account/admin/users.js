import ApplicationRoute from '../../../routes/application';
import { hash } from 'rsvp';

import ENV from 'bank-system/config/environment';
import $ from 'jquery';

export default ApplicationRoute.extend({
  model(params) {
    return hash({
      pageChecker: $.ajax({
        url: ENV.HOST_URL + '/api/v1/user/page/size?pageSize=10',
        type: 'GET',
        xhrFields: {
          withCredentials: true
        },
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      }),
      users: this.store.query('user', {
        page: params.page
      }),
    })
  },
  
  setupController(controller) {
    this._super(...arguments);

    let { page } = this.paramsFor(this.routeName);
    controller.set('currentPage', page);
  }
});
