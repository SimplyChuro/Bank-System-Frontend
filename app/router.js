import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('error', { path: '/*wildcard' });
  this.route('home');
  this.route('about-us');
  this.route('terms-and-conditions');
  this.route('privacy-and-policy');
  this.route('login');
  this.route('register');
  this.route('register-success');
  this.route('contact-information');
  this.route('account', function() {
    this.route('user', function() {
      this.route('profile');
      this.route('deposits', { path: 'deposits/:page' });
      this.route('make-a-deposit');
      this.route('withdrawals', { path: 'withdrawals/:page' });
      this.route('make-a-withdrawal');
      this.route('payments', { path: 'payments/:page' });
      this.route('make-a-payment');
    });

    this.route('admin', function() {
      this.route('users', { path: 'users/:page' });
      this.route('deposits', { path: 'deposits/:page' });
      this.route('withdrawals', { path: 'withdrawals/:page' });
      this.route('payments', { path: 'payments/:page' });
    });

    this.route('moderator', function() {
      this.route('users', { path: 'users/:page' });
      this.route('deposits', { path: 'deposits/:page' });
      this.route('withdrawals', { path: 'withdrawals/:page' });
      this.route('payments', { path: 'payments/:page' });
    });

    this.route('staff', function() {
      this.route('users', { path: 'users/:page' });
      this.route('deposits', { path: 'deposits/:page' });
      this.route('withdrawals', { path: 'withdrawals/:page' });
      this.route('payments', { path: 'payments/:page' });
    });
  });
});

export default Router;
