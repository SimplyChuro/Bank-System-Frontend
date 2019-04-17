import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  name: DS.attr('string'),
  surname: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  status: DS.attr('string'),
  bankAccount: DS.attr('string'),
  date: DS.attr('date'),
  balance: DS.attr('number'),
  roles: DS.hasMany('role'),
  avatar: DS.belongsTo('picture')
});