import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';

export default Controller.extend({

  amountHasError: null,
  amountErrorMessage: null,

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
    async deposit() {
      var _this = this;
      if(this.depositFormValidation()) {
        let deposit = this.store.createRecord('deposit');
        deposit.set('amount', this.get('amount'));
 
        await deposit.save().then(function() {
          _this.transitionToRoute('account.user.deposits', 1);
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