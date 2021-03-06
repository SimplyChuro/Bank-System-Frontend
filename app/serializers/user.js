import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    roles: { embedded: 'always' },
    avatar: { embedded: 'always' }
  }, 
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload = { user:payload };
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});