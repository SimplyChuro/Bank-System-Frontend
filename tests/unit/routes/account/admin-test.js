import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/admin', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/admin');
    assert.ok(route);
  });
});
