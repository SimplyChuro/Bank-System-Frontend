import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/moderator/withdrawals', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/moderator/withdrawals');
    assert.ok(route);
  });
});
