ember-data-dreamfactory-adapter
===============================

An Ember-Data adapter for the [DreamFactory REST API platform] (http://www.dreamfactory.com/)

Currently has very basic support for GET, POST, PUT and DELETE operations. 

##USAGE##
###Standard REST API###
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
return this.store.find('todo', { 
   'limit': 10, 
   'order': 'date desc, name asc', 
   'filter': 'id in (5,15)'
});
```

###Stored Procedures###
**Stored Procedure support is functional for the following methods:**
- **find**

Call the `GetTodos` stored procedure with no parameters:

```
return this.store.find('todo', { 
   procedure: 'GetTodos'
});
```

Call the `GetTodos` stored procedure for just OPEN Todos only:

```
return this.store.find('todo'), {
	procedure: 'GetOpenTodos',
	params: [{ 'name': 'complete', 'value': false }]
});
```

See https://github.com/dreamfactorysoftware/dsp-core/wiki/SQL-Stored-Procedures for more information on what parameters can be passed

##TODO##
- Relationships
- Params for POST/PUT/DELETE operations
- Stored Procedure support
- Tests
- ES6'ify
- ???

##Helping out###
I can use all the help I can get. Nothing fancy right now - clone, modify, submit PR.
