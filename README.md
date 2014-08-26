ember-data-dreamfactory-adapter
===============================

An Ember-Data adapter for the [DreamFactory REST API platform] (http://www.dreamfactory.com/)

Currently has very basic support for GET, POST, PUT and DELETE operations. 

##USAGE##
To access a REST API located at `http://dsp-my-app.cloud.dreamfactory.com/rest/db/todo` for app `todojquery`

```
App.TodoAdapter = EmberDreamFactoryAdapter.Adapter.extend({
  host: 'http://dsp-my-app.cloud.dreamfactory.com',
  namespace: 'rest/db',
  applicationName: 'todojquery'
});

```
Then use ED like you normally would.
```
return this.store.find('todo');
```

Query parameters are currently supported for GET calls only. If you need to utilize just pass them to the `find` method as a hash after the model:

```
return this.store.find('todo', { 'limit': 10, 'order': 'date desc, name asc', 'filter': 'id in (5,15)' });
```

##TODO##
- Relationships
- Params for POST/PUT/DELETE operations
- Stored Procedure support
- Tests
- ES6'ify
- ???

##Helping out###
I can use all the help I can get. Nothing fancy right now - clone, modify, submit PR.
