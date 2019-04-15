import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  customSession: service(),

  compute(params) {
    let checker = null;
    var userId = params[0];

    if(this.get('customSession').getUserID() == userId) {
      checker = true;
    }
  
    return checker;
  }
});