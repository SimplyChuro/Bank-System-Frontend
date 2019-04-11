import EmberObject from '@ember/object';
import ResetScrollMixin from 'bank-system/mixins/reset-scroll';
import { module, test } from 'qunit';

module('Unit | Mixin | reset-scroll', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ResetScrollObject = EmberObject.extend(ResetScrollMixin);
    let subject = ResetScrollObject.create();
    assert.ok(subject);
  });
});
