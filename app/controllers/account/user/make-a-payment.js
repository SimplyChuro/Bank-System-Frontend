import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';

export default Controller.extend({

  amountHasError: null,
  amountErrorMessage: null,

  bankAccountHasError: null,
  bankAccountErrorMessage: null,

  requestHasError: null,
  requestErrorMessage: 'The given bank account is invalid or you have insufficient funds',

  paymentFormValidation: function() {
    var checker = true;
 
    if(isEmpty(this.get('amount')) || (this.get('amount').length != 0 && this.get('amount').trim().length == 0)) {
      this.set('amountHasError', true);
      this.set('amountErrorMessage', 'Amount can not be blank');
      checker = false;
    } else {
      if(parseFloat(this.get('amount'), 10).toFixed(2) > 0.00) {
        this.set('amountHasError', false);
      } else {
        this.set('amountHasError', true);
        this.set('amountErrorMessage', 'Amount must be bigger than 0');
        checker = false;
      }
    }

    if(isEmpty(this.get('account')) || (this.get('account').length != 0 && this.get('account').trim().length == 0)) {
      this.set('bankAccountHasError', true);
      this.set('bankAccountErrorMessage', 'Bank Account can not be blank');
      checker = false;
    } else {
      this.set('bankAccountHasError', false);
    }

    return checker;
  },

  actions: {
    async send() {
      var _this = this;
      if(this.paymentFormValidation()) {
        let payment = this.store.createRecord('payment');
        payment.set('amount', this.get('amount'));
        payment.set('bankAccount', this.get('account'));

        await payment.save().then(function() {
          _this.transitionToRoute('account.user.payments', 1);
        }).catch(function() {
          _this.set('requestHasError', true);
        });
      }
    },

    clear: function() {
      this.set('amount', '');
      this.set('account', '');
      this.set('amountHasError', null);
      this.set('amountErrorMessage', null);
      this.set('bankAccountHasError', null);
      this.set('bankAccountErrorMessage', null);
    }
  }

});