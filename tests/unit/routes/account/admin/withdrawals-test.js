import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/admin/withdrawals', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/admin/withdrawals');
    assert.ok(route);
  });
});
