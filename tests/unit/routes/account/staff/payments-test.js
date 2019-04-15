import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/staff/payments', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/staff/payments');
    assert.ok(route);
  });
});
