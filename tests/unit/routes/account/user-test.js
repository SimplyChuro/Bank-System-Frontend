import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/user', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/user');
    assert.ok(route);
  });
});
