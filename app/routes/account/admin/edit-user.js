import ApplicationRoute from '../../../routes/application';
import { inject as service } from '@ember/service';
import { isEqual } from '@ember/utils';
import { hash } from 'rsvp';

export default ApplicationRoute.extend({
  customSession: service(),

  model(params) {
    return hash({
      user: this.store.findRecord('user', params.id, { reload: true }),
    })
  },
  
  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('account/admin/edit-user').set('name', model.user.name);
    this.controllerFor('account/admin/edit-user').set('surname', model.user.surname);
    this.controllerFor('account/admin/edit-user').set('bankAccount', model.user.bankAccount);
    this.controllerFor('account/admin/edit-user').set('email', model.user.email);

    model.user.get('roles').then(result => {
      var checker = result.get('firstObject').get('name');
      if(isEqual(checker, 'admin')) {
        this.controllerFor('account/admin/edit-user').set('noRole', true);
      } else if(isEqual(checker, 'moderator')) {
        this.controllerFor('account/admin/edit-user').set('moderator', true);
      } else if(isEqual(checker, 'staff')) {
        this.controllerFor('account/admin/edit-user').set('staff', true);
      } else {
        this.controllerFor('account/admin/edit-user').set('default', true);
      }
    });

  },

  actions: {
    willTransition: function() {
      this.controllerFor('account/admin/edit-user').send('clear');
    }
  }

});
