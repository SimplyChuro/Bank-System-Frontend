import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | contact-information', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:contact-information');
    assert.ok(route);
  });
});
