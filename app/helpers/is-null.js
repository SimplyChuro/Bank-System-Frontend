import Helper from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export default Helper.extend({
  
  compute(params) {
    let checker = params[0];

    if(isEmpty(checker)) {
      return true;
    } else {
      return false;
    }
  }
  
});