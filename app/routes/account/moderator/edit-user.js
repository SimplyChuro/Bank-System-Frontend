import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isEqual } from '@ember/utils';
import { hash } from 'rsvp';

export default Route.extend({
  customSession: service(),

  model(params) {
    return hash({
      user: this.store.findRecord('user', params.id, { reload: true }),
    })
  },
  
  setupController(controller, model) {
    this._super(controller, model);
    this.controllerFor('account/moderator/edit-user').set('name', model.user.name);
    this.controllerFor('account/moderator/edit-user').set('surname', model.user.surname);
    this.controllerFor('account/moderator/edit-user').set('bankAccount', model.user.bankAccount);
    this.controllerFor('account/moderator/edit-user').set('email', model.user.email);

    model.user.get('roles').then(result => {
      var checker = result.get('firstObject').get('name');
      if(isEqual(checker, 'admin')) {
        this.controllerFor('account/moderator/edit-user').set('noRole', true);
      } else if(isEqual(checker, 'moderator')) {
        this.controllerFor('account/moderator/edit-user').set('noRole', true);
      } else if(isEqual(checker, 'staff')) {
        this.controllerFor('account/moderator/edit-user').set('staff', true);
      } else {
        this.controllerFor('account/moderator/edit-user').set('default', true);
      }
    });

  },

  actions: {
    willTransition: function() {
      this.controllerFor('account/moderator/edit-user').send('clear');
    }
  }

});
