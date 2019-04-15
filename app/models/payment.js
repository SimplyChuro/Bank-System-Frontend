import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  status: DS.attr('string'),
  bankAccount: DS.attr('string'),
  sender: DS.attr('string'),
  date: DS.attr('date'),
  amount: DS.attr('number')
});