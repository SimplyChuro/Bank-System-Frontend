import Service from '@ember/service';
import { isEmpty } from '@ember/utils';

import Cookies from 'ember-cli-js-cookie';

export default Service.extend({
  token: null,
  id: null,
  role: null,

  getToken: function() {
    var token = null;
    if(!isEmpty(Cookies.get('token'))) {
      token = Cookies.get('token');
    } else if(!isEmpty(window.localStorage.getItem('token'))) {
      token = window.localStorage.getItem('token');
    }
    return token;
  },
  
  getUserID: function() {
    var idNumber = null;
    if(!isEmpty(Cookies.get('id'))) {
      idNumber = Cookies.get('id');
    } else if(!isEmpty(window.localStorage.getItem('id'))) {
      idNumber = window.localStorage.getItem('id');
    }
    return parseInt(idNumber);
  },

  getRole: function() {
    var token = null;
    if(!isEmpty(Cookies.get('role'))) {
      token = Cookies.get('role');
    } else if(!isEmpty(window.localStorage.getItem('role'))) {
      token = window.localStorage.getItem('role');
    }
    return token;
  },

  isLoggedIn: function() {
    if((Cookies.get("SESSION") != null) || (window.localStorage.getItem("SESSION") !== null)) {
      return true;
    } else {
      return false;
    }
  },

  setCookieData: function(token, id, role) {
    Cookies.set('token', token);
    Cookies.set('id', id);
    Cookies.set('role', role);

    this.set('token', token);
    this.set('id', id);
    this.set('role', role);
  },

  clearAll: function() {
    window.localStorage.clear();
    Cookies.remove("SESSION");
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("role");
    
    this.set("token", null);
    this.set("id", null);
    this.set("role", null);
  }

});