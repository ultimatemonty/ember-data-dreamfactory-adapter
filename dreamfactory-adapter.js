
/*
 * namespace for the DSP Adapter
 */
var EmberDreamFactoryAdapter = {};

/*
 * Serializer overrides
 */
EmberDreamFactoryAdapter.Serializer = DS.RESTSerializer.extend({

	extractArray: function(store, primaryType, payload) {
		var namespacedPayload = {};
		namespacedPayload[Ember.String.pluralize(primaryType.typeKey)] = payload.record;
		return this._super(store, primaryType, namespacedPayload);
	},

	extractSingle: function (store, primaryType, payload, recordId) {
		var namespacedPayload = {};
		namespacedPayload[primaryType.typeKey] = payload;
		return this._super(store, primaryType, namespacedPayload, recordId);
	},

	typeForRoot: function (key) {
		return Ember.String.dasherize(Ember.String.singularize(key));
	},

	serialize: function (record, options) {
		options = options || { includeId: true };
		return this._super(record, options);
	},

	// set the JSON root to 'record' to make DSP happy
	serializeIntoHash: function (data, type, record, options) {
		var root = 'record';
		data[root] = this.serialize(record, options);
	}
});

/*
 * An Ember Data Adapter written to use DreamFactory REST API
 * @type {DS.RESTAdapter}
 */
EmberDreamFactoryAdapter.Adapter = DS.RESTAdapter.extend({
	
	defaultSerializer: '-dreamfactory',

	init: function () {
		this._super();
		this.set('headers', {
			'X-DreamFactory-Application-Name': this.get('applicationName')
		});
	},

	pathForType: function (type) {
		return Ember.String.pluralize(Ember.String.capitalize(Ember.String.camelize(type)));
	},

	// Used https://github.com/clintjhill/ember-parse-adapter/blob/master/dist/ember-parse-adapter.js#L290 as a starting point
	createRecord: function(store, type, record) {
		var data = {};
		var serializer = store.serializerFor(type.typeKey);
		serializer.serializeIntoHash(data, type, record);
		var adapter = this;

		return new Ember.RSVP.Promise(function(resolve, reject) {
			adapter.ajax(adapter.buildURL(type.typeKey, id), "POST", { data: data }).then(function(json){
				// if the request is a success we'll return the same data we passed in
				var completed = Ember.merge(data.record, json);
				resolve(completed);
			}, function(reason){
				reject(reason.responseJSON);
			});
		});
	},

	// Used https://github.com/clintjhill/ember-parse-adapter/blob/master/dist/ember-parse-adapter.js#L290 as a starting point
	updateRecord: function(store, type, record) {
		var data = {};
		var serializer = store.serializerFor(type.typeKey);
		serializer.serializeIntoHash(data, type, record);
		var adapter = this;

		return new Ember.RSVP.Promise(function(resolve, reject) {
			// hack to make DSP send back the full object
			adapter.ajax(adapter.buildURL(type.typeKey) + '?fields=*', "PUT", { data: data }).then(function(json){
				// if the request is a success we'll return the same data we passed in
				resolve(json);
			}, function(reason){
				reject(reason.responseJSON);
			});
		});
	},

	sessionToken: Ember.computed('headers.X-DreamFactory-Session-Token', function (key, value) {
		if (arguments.length < 2) {
			return this.get('headers.X-DreamFactory-Session-Token');
		} else {
			this.set('header.X-DreamFactory-Session-Token', value);
			return value;
		}
	})
});

EmberDreamFactoryAdapter.setupContainer = function(container) {
	container.register('serializer:-dreamfactory', EmberDreamFactoryAdapter.Serializer);
};

/**
 * Setup the DSP Adapter in the app.
 */
Ember.onLoad('Ember.Application', function(Application) {
	Application.initializer({
		after: "ember-data",
		name: 'dreamfactory-adapter',
		initialize: function(container, application) {
			EmberDreamFactoryAdapter.setupContainer(container);
		}
	});
});
