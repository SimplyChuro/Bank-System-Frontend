import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/user/make-a-withdrawal', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/user/make-a-withdrawal');
    assert.ok(route);
  });
});
