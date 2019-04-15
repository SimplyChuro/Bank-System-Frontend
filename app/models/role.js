import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr('string'),
  status: DS.attr('string'),
  user: DS.hasMany('user')
});