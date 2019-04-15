import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';
import { isEqual } from '@ember/utils';

export default Controller.extend({

  nameErrorMessage: null,
  nameHasError: null,

  surnameErrorMessage: null,
  surnameHasError: null,

  emailErrorMessage: null,
  emailHasError: null,

  passwordErrorMessage: null,
  passwordHasError: null,

  passwordConfirmationErrorMessage: null,
  passwordConfirmationHasError: null,
  
  emailExistsErrorMessage: 'The input email is in usage',
  emailExistsHasError: null,

  registerFormValidation: function() {
    var checker = true;
    var passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,64}$/);
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

    if(isEmpty(this.get('password')) || (this.get('password').length != 0 && this.get('password').trim().length == 0) || (this.get('name').length > 100)) {
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
    
    if(isEqual(this.get('password'), this.get('confirmPassword'))) {
      this.set('passwordConfirmationHasError', false);
    } else {
      this.set('passwordConfirmationHasError', true);
      this.set('passwordConfirmationErrorMessage', 'Passwords do not match');
      checker = false;
    }

    return checker;
  },


  actions: {
    async register() {
      var _this = this;
      if(this.registerFormValidation()) {
        let user = this.store.createRecord('user');
        user.set('name', this.get('name'));
        user.set('surname', this.get('surname'));
        user.set('email', this.get('email'));
        user.set('password', this.get('password'));
        await user.save().then(function() {
          _this.transitionToRoute('register-success');
        }).catch(function() {
          _this.set('emailExistsHasError', true);
        });
      }
    },

    clear: function() {
      this.set('name', ''); 
      this.set('surname', '');
      this.set('email', ''); 
      this.set('password', '');
      this.set('nameErrorMessage', null);
      this.set('nameHasError', null);
      this.set('surnameErrorMessage', null);
      this.set('surnameHasError', null);
      this.set('emailErrorMessage', null);
      this.set('emailHasError', null);
      this.set('passwordErrorMessage', null);
      this.set('passwordHasError', null);
      this.set('passwordConfirmationErrorMessage', null);
      this.set('passwordConfirmationHasError', null);
      this.set('emailExistsHasError', null);
    }
  }

});