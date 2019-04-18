import ApplicationRoute from '../../../routes/application';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default ApplicationRoute.extend({
  customSession: service(),

  model() {
    return hash({
      user: this.store.findRecord('user', this.get('customSession').getUserID(), { reload: true }),
    })
  },
  
  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('account/user/profile').set('name', model.user.name);
    this.controllerFor('account/user/profile').set('surname', model.user.surname);
    this.controllerFor('account/user/profile').set('bankAccount', model.user.bankAccount);
  },

  actions: {
    willTransition: function() {
      this.controllerFor('account/user/profile').send('clear');
    }
  }

});