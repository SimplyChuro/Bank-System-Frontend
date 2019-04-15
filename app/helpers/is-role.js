import Helper from '@ember/component/helper';
import { isEqual } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Helper.extend({
  customSession: service(),
  
  compute(params) {
    let role = this.get('customSession').getRole();
    let roleChecker = params[0];
    
    if(isEqual(role, roleChecker)) {
      return true;
    } else {
      return false;
    }
  }
  
});