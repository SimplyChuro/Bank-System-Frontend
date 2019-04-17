import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | account/moderator/edit-user', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:account/moderator/edit-user');
    assert.ok(route);
  });
});
