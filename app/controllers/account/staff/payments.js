import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  currentPage: null,
  amountOfPages: null,

  firstPageFar: computed('currentPage', 'model.pageChecker', function() {
    if(parseInt(this.get('currentPage')) > 3) {
      return true;
    } else {
      return false;
    }
  }),
  
  lastPageFar: computed('currentPage', 'model.pageChecker', function() {
    if(parseInt(this.get('model.pageChecker')) - 3 >= parseInt(this.get('currentPage'))) {
      return true;
    } else {
      return false;
    }
  }),

  previousPage: computed('currentPage', 'model.pageChecker', function() {
    if(parseInt(this.get('currentPage')) > 1) {
      return parseInt(this.get('currentPage')) - 1;
    } else {
      return "-";
    }
  }),

  nextPage: computed('currentPage', 'model.pageChecker', function() {
    if(parseInt(this.get('model.pageChecker')) >= parseInt(this.get('currentPage')) + 1) {
      return parseInt(this.get('currentPage')) + 1;
    } else {
      return "-";
    }
  }),

  actions: {
    nextPage: function() {
      if(!((parseInt(this.get('currentPage')) + 1) > parseInt(this.get('model.pageChecker')))) {
        this.transitionToRoute('account.admin.payments', parseInt(this.get('currentPage')) + 1);
      }
    },

    previousPage: function() {
      if(((parseInt(this.get('currentPage')) - 1) > 0)) {
        this.transitionToRoute('account.admin.payments', parseInt(this.get('currentPage')) - 1);
      }
    },

    firstPage: function() {
      this.transitionToRoute('account.admin.payments', 1);
    },

    lastPage: function() {
      this.transitionToRoute('account.admin.payments', this.get('model.pageChecker'));
    }
  }

});