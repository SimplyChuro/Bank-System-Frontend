import ApplicationRoute from '../../../routes/application';

export default ApplicationRoute.extend({
  actions: {
    willTransition: function() {
      this.controllerFor('account/user/make-a-payment').send('clear');
    }
  }
});
