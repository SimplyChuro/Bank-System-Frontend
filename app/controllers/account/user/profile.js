import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';

import Swal from 'sweetalert2';

export default Controller.extend({

  nameHasError: null,
  nameErrorMessage: null,

  surnameHasError: null,
  surnameErrorMessage: null,

  bankAccountHasError: null,
  bankAccountErrorMessage: null,

  profileFormValidations: function(){
    var checker = true;

    if(isEmpty(this.get('name')) || (this.get('name').length != 0 && this.get('name').trim().length == 0) || (this.get('name').length > 100)) {
      this.set('nameHasError', true);
      this.set('nameErrorMessage', 'Name can not be blank');
      checker = false;
    } else {
      this.set('nameHasError', false);
    }

    if(isEmpty(this.get('surname')) || (this.get('surname').length != 0 && this.get('surname').trim().length == 0) || (this.get('surname').length > 100)) {
      this.set('surnameHasError', true);
      this.set('surnameErrorMessage', 'Surname can not be blank');
      checker = false;
    } else {
      this.set('surnameHasError', false);
    }

    if(isEmpty(this.get('bankAccount')) || (this.get('bankAccount').length != 0 && this.get('bankAccount').trim().length == 0) || (this.get('bankAccount').length > 100)) {
      this.set('bankAccountHasError', true);
      this.set('bankAccountErrorMessage', 'Bank Account can not be blank');
      checker = false;
    } else {
      this.set('bankAccountErrorMessage', false);
    }

    return checker;
  },

  actions: {
    async update() {
      if(this.profileFormValidations()) {
        let user = this.get('model.user');

        user.set('name', this.get('name'));
        user.set('surname', this.get('surname'));
        user.set('bankAccount', this.get('bankAccount'));

        await user.save().then(function() {
          Swal.fire('Success!', 'You have successfully updated your profile!', 'success');
        }).catch(function() {
          Swal.fire('Error!', 'Oops, an error has occurred!', 'error');
        });
      }
    },

    clear: function() {
      this.set('nameErrorMessage', null);
      this.set('nameHasError', null);
      this.set('surnameErrorMessage', null);
      this.set('surnameHasError', null);
    }

  }

});
