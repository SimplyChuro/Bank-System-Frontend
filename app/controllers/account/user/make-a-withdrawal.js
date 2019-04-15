import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';

export default Controller.extend({

  amountHasError: null,
  amountErrorMessage: null,

  balanceHasError: null,
  balanceErrorMessage: 'You can not withdraw any more funds',

  depositFormValidation: function() {
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

    return checker;
  },

  actions: {
    async withdrawal() {
      var _this = this;
      if(this.depositFormValidation()) {
        let withdrawal = this.store.createRecord('withdrawal');
        withdrawal.set('amount', this.get('amount'));
 
        await withdrawal.save().then(function() {
          _this.transitionToRoute('account.user.withdrawals', 1);
        }).catch(function() {
          _this.set('balanceHasError', true);
        });
      }
    },

    clear: function() {
      this.set('amount', '');
      this.set('amountHasError', null);
      this.set('amountErrorMessage', null);
    }
  }

});