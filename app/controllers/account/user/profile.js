import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';

import ENV from 'bank-system/config/environment';
import Swal from 'sweetalert2';
import $ from 'jquery';

export default Controller.extend({

  nameHasError: null,
  nameErrorMessage: null,

  surnameHasError: null,
  surnameErrorMessage: null,

  bankAccountHasError: null,
  bankAccountErrorMessage: null,

  passwordHasError: null,
  passwordErrorMessage: null,

  newPasswordToggled: null,

  profileFormValidations: function(){
    var checker = true;
    var passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/);

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

    return checker;
  },

  actions: {

    async update() {
      if(this.profileFormValidations()) {
        let user = this.get('model.user');

        user.set('name', this.get('name'));
        user.set('surname', this.get('surname'));
        user.set('bankAccount', this.get('bankAccount'));
        user.set('password', this.get('password'));

        await user.save().then(function() {
          Swal.fire('Success!', 'You have successfully updated your profile!', 'success');
        }).catch(function() {
          Swal.fire('Error!', 'Oops, an error has occurred!', 'error');
        });
      }
    },

    async upload() {
      let fileInput = $("#avatar")[0];
      let image = fileInput.files[0];

      var _this = this;
      var data = new FormData();
      data.append('picture', image);

      await $.ajax({
        url: ENV.HOST_URL + "/" + ENV.SUB_API_ROUTE + "/" + ENV.HOST_PICTURE,
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        xhrFields: {
          withCredentials: true
        },
        type: 'POST'
      }).then(function() {
        Swal.fire('Success', 'Avatar has been posted!', 'success');
        _this.get('model.user').reload();
      }).catch(function() {
        Swal.fire('Error', 'Something went wrong!', 'error');
      });
    },

    async delete() {
      var _this = this;

      this.get('model.user').get('avatar').then(result => {
        result.destroyRecord().then(function() {
          Swal.fire('Success', 'Avatar has been deleted!', 'success');
          _this.get('model.user').reload();
        }).catch(function() {
          Swal.fire('Error', 'Something went wrong!', 'error');
        });
      });
    },

    toggleNewPassword: function() {
      this.set('newPasswordToggled', true);
      this.set('password', '');
    },

    clear: function() {
      this.set('nameErrorMessage', null);
      this.set('nameHasError', null);
      this.set('surnameErrorMessage', null);
      this.set('surnameHasError', null);
      this.set('password', '');
      this.set('passwordHasError', null);
      this.set('passwordErrorMessage', null);
      this.set('newPasswordToggled', null);
    }

  }

});