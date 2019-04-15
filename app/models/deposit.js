import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  status: DS.attr('string'),
  date: DS.attr('date'),
  sender: DS.attr('string'),
  amount: DS.attr('number')
});