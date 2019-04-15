import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/user/profile', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/user/profile');
    assert.ok(route);
  });
});
