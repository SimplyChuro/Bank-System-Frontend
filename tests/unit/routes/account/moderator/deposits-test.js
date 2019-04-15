import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/moderator/deposits', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/moderator/deposits');
    assert.ok(route);
  });
});
