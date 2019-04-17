import Service from '@ember/service';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Service.extend({
  cookies: service(),

  token: null,
  id: null,
  role: null,

  getToken: function() {
    var token = null;
    if(!isEmpty(this.get('cookies').read('token'))) {
      token = this.get('cookies').read('token');
    } else if(!isEmpty(window.localStorage.getItem('token'))) {
      token = window.localStorage.getItem('token');
    }
    return token;
  },
  
  getUserID: function() {
    var idNumber = null;
    if(!isEmpty(this.get('cookies').read('id'))) {
      idNumber = this.get('cookies').read('id');
    } else if(!isEmpty(window.localStorage.getItem('id'))) {
      idNumber = window.localStorage.getItem('id');
    }
    return parseInt(idNumber);
  },

  getRole: function() {
    var token = null;
    if(!isEmpty(this.get('cookies').read('role'))) {
      token = this.get('cookies').read('role');
    } else if(!isEmpty(window.localStorage.getItem('role'))) {
      token = window.localStorage.getItem('role');
    }
    return token;
  },

  isLoggedIn: function() {
    if((this.get('cookies').read("SESSION") != null) || (window.localStorage.getItem("SESSION") !== null)) {
      return true;
    } else {
      return false;
    }
  },

  setCookieData: function(token, id, role) {
    this.get('cookies').clear("token");
    this.get('cookies').clear("id");
    this.get('cookies').clear("role");
    
    this.get('cookies').write('token', token, null);
    this.get('cookies').write('id', id, null);
    this.get('cookies').write('role', role, null);

    this.set('token', token);
    this.set('id', id);
    this.set('role', role);
  },

  clearAll: function() {
    window.localStorage.clear();
    this.get('cookies').clear("SESSION");
    this.get('cookies').clear("token");
    this.get('cookies').clear("id");
    this.get('cookies').clear("role");
    
    this.set("token", null);
    this.set("id", null);
    this.set("role", null);
  }

});