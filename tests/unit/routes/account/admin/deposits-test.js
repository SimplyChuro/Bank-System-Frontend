import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/admin/deposits', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/admin/deposits');
    assert.ok(route);
  });
});
