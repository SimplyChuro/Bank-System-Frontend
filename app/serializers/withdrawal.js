import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
  }, 
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload = { withdrawal:payload };
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});