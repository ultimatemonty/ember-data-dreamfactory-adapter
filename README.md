ember-data-dreamfactory-adapter
===============================

An Ember-Data adapter for the [DreamFactory REST API platform] (http://www.dreamfactory.com/)

Currently has very basic support for GET, POST, and DELETE operations. 

##USAGE##
```
App.ModelAdapter = EmberDreamFactoryAdapter.Adapter.extend({
  host: 'DSP REST endpoint',
  namespace: 'rest/DSP service API name',
  applicationName: 'DSP App Name'
});
```

Then use ED like you normally would.

##TODO##
- Relationships
- PATCH/PUT operations
- Params for GET operations
- Stored Procedure support
- ???

##Helping out###
I can use all the help I can get.
