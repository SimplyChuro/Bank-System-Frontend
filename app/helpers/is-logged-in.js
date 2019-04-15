import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  customSession: service(),

  compute() {
    let checker = null;
  
    if(this.get('customSession').isLoggedIn()) {
      checker = true;
    }
  
    return checker;
  }
});