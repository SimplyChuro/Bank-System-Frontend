import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  status: DS.attr('string'),
  url: DS.attr('string')
});