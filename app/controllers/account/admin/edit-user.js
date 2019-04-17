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

  passwordHasError: null,
  passwordErrorMessage: null,

  emailErrorMessage: null,
  emailHasError: null,

  newPasswordToggled: null,

  noRole: null,

  moderatorCheckboxObserver: function() {
    if(this.get('moderator') == true) {
      this.set('staff', false);
      this.set('default', false);
    } else if(this.get('staff') == true) {
      this.set('moderator', false);
      this.set('default', false);
    } else if(this.get('default') == true) {
      
    } else {
      this.set('staff', true);
      this.set('default', false); 
    }
  }.observes('moderator'),

  staffCheckboxObserver: function() {
    if(this.get('staff') == true) {
      this.set('default', false);
      this.set('moderator', false);
    } else if(this.get('default') == true) {
      this.set('staff', false);
      this.set('moderator', false);
    } else if(this.get('moderator') == true) {
   
    } else {
      this.set('default', true);
      this.set('moderator', false);
    }
  }.observes('staff'),

  defaultCheckboxObserver: function() {
    if(this.get('default') == true) {
      this.set('moderator', false);
      this.set('staff', false);
    } else if(this.get('moderator') == true) {
      this.set('default', false);
      this.set('staff', false);
    } else if(this.get('staff') == true) {
    
    } else {
      this.set('staff', true);
    }
  }.observes('default'),


  editUserFormValidations: function(){
    var checker = true;
    var passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/);
    var emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    

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

    if(this.get('newPasswordToggled')) {
      if(isEmpty(this.get('password')) || (this.get('password').length != 0 && this.get('password').trim().length == 0) || (this.get('password').length > 100)) {
        this.set('passwordHasError', true);
        this.set('passwordErrorMessage', 'Password can not be blank');
        checker = false;
      } else {
        if((this.get('password').length > 7)) {
          if(passwordRegex.test(this.get('password'))) {
            this.set('passwordHasError', false);
          } else {
            this.set('passwordHasError', true);
            this.set('passwordErrorMessage', 'Password must contain one letter, one symbol and one uppercase letter');
            checker = false;
          }
        } else {
          this.set('passwordHasError', true);
          this.set('passwordErrorMessage', 'Password must be at least 8 characters long');
          checker = false;
        }
      }
    }

    if(isEmpty(this.get('email')) || (this.get('email').length != 0 && this.get('email').trim().length == 0) || (this.get('email').length > 100)) {
      this.set('emailHasError', true);
      this.set('emailErrorMessage', 'Email can not be blank');
      checker = false;
    } else {
      if(emailRegex.test(this.get('email'))) {
        this.set('emailHasError', false);
      } else {
        this.set('emailHasError', true);
        this.set('emailErrorMessage', 'Invalid Email');
        checker = false;
      }
    }
    
    return checker;
  },

  actions: {

    async update() {
      if(this.editUserFormValidations()) {

        let user = this.get('model.user');

        user.set('name', this.get('name'));
        user.set('surname', this.get('surname'));
        user.set('bankAccount', this.get('bankAccount'));
        user.set('email', this.get('email'));
        user.set('password', this.get('password'));

        let roles = [];
        let role = this.store.createRecord('role');
        
        if(!this.get('noRole')) {
          if(this.get('moderator')) {
            role.set('name', 'moderator');
          } else if(this.get('staff')) {
            role.set('name', 'staff');
          } else if(this.get('default')) {
            role.set('name', 'user');
          }
          roles.push(role);

          user.set('roles', roles);
        }
        
        await user.save().then(function() {
          Swal.fire('Success!', 'You have successfully updated your profile!', 'success');
        }).catch(function() {
          Swal.fire('Error!', 'Oops, an error has occurred!', 'error');
        });
      }
    },

    toggleNewPassword: function() {
      this.set('newPasswordToggled', true);
      this.set('password', '');
    },

    back: function() {
      window.history.back();
    },

    clear: function() {
      this.set('nameErrorMessage', null);
      this.set('nameHasError', null);
      this.set('surnameErrorMessage', null);
      this.set('surnameHasError', null);
      this.set('password', '');
      this.set('passwordHasError', null);
      this.set('passwordErrorMessage', null);
      this.set('emailErrorMessage', null);
      this.set('emailHasError', null);
      this.set('newPasswordToggled', null);
      this.set('noRole', null);
    }

  }

});