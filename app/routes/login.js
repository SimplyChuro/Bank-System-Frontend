import ApplicationRoute from '../routes/application';

export default ApplicationRoute.extend({
  actions: {
    willTransition: function() {
      this.controllerFor('login').send('clear');
    }
  }
});
