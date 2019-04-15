import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

import ENV from 'bank-system/config/environment';
import $ from 'jquery';

export default Controller.extend({
  customSession: service(),

  emailHasError: false,
  emailErrorMessage: '',

  passwordHasError: false,
  passwordErrorMessage: '',

  loginHasError: false,
  loginErrorMessage: '',

  loginFormValidation: function() {
    var checker = true;
 
    if(isEmpty(this.get('email')) || (this.get('email').length != 0 && this.get('email').trim().length == 0)) {
      this.set('emailHasError', true);
      this.set('emailErrorMessage', 'Email can not be blank');
      checker = false;
    } else {
      this.set('emailHasError', false);
    }

    if(isEmpty(this.get('password')) || (this.get('password').length != 0 && this.get('password').trim().length == 0)) {
      this.set('passwordHasError', true);
      this.set('passwordErrorMessage', 'Password can not be blank');
      checker = false;
    } else {
      this.set('passwordErrorMessage', false);
    }

    return checker;
  },

  actions: {
    async login() {
      var _this = this;
      if(this.loginFormValidation()) {
        await $.ajax({
          url: ENV.HOST_URL + '/api/v1/login',
          type: 'POST',
          data: JSON.stringify({
            email: this.get('email'),
            password: this.get('password')
          }),
          xhrFields: {
            withCredentials: true
          },
          contentType: 'application/json;charset=utf-8',
          dataType: 'json',
          success: function(data) {
            _this.get('customSession').setCookieData(data.token, data.id, data.role);
          },
          error: function(data) {
            var msg = $.parseJSON(data.responseText);
            _this.set('loginHasError', true);
            _this.set('loginErrorMessage', msg.error_message);
          }
        }).then(function() {
          _this.set('loginHasError', false);
          _this.transitionToRoute('home');
        }).catch(function() {
          _this.set('loginHasError', true);
        });
      }
    },

    clear: function() {
      this.set('email', ''); 
      this.set('password', '');
      this.set('loginHasError', false);
      this.set('loginErrorMessage', '');
      this.set('emailHasError', false);
      this.set('emailErrorMessage', '');
      this.set('passwordHasError', false);
      this.set('passwordErrorMessage', '');
    }

  }

});
