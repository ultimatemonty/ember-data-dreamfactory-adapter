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

##TODO##
- Relationships
- PATCH/PUT operations
- Params for GET operations
- ???

##Helping out###
I can use all the help I can get.
