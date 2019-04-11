import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('about-us');
  this.route('terms-and-conditions');
  this.route('privacy-and-policy');
  this.route('login');
  this.route('register');
  this.route('register-success');
  this.route('contact-information');
});

export default Router;
