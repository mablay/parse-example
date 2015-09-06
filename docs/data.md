# Data Model Documentation

The application data structure is described here. By far not all structures used are described, but the essential ones are.
With essential I mean those structure that carry the minimal information for the app use case and should be known when reading the source code. 

**TODO:** 
Describe data models with [Docson](https://github.com/lbovet/docson). And don't forget about [Typson](https://github.com/lbovet/typson)!

## Persistence Layer (Parse.com)
This is about data in the backend requested via parses REST interface.
If you'd like to build your own parse backend for this app, make sure to provide at least the following data classes.

### User
Since activities and their records are user specific, we need a user model to associate and protect user specific data.

	User (Parse Class)
	------------------
	objectId <String>
	username <String>
	password <String>		

That's pretty much as simple as it gets for a user model. Since this is a demo, we leave it at that.

### Activity
In respect to human versatility this app allows every user to have manny activites. Throughout the app an activity defines trackable repeatable behavior. Each activity is described in a custom set of primitive data types chosen by the user.

	Activity (Parse Class)
	----------------------
	objectId	<String>
	name		<String>
	schema		<Object>	// Described in ActivitySchema
	ACL			<ACL>		// Refers to User.objectId
	
The Activity.schema object can have zero to manny properties and has to be structured as follows:

	ActivitySchema (JSON)
	---------------------
	{
		propertyName1: <Object>,	// Described in ActivityProperty
		propertyName2: <Object>,	// Described in ActivityProperty
		...
	}

	ActivityProperty (JSON)
	-----------------------
	{
		description:	<String>,
		type:			<String>,
		validation:		<Object>,	// Described in ValidationDefinition
	}
	
	ValidationDefinition (JSON)
	---------------------------
	tbd.							// Not yet implemented
	// JSON Schema would suggest putting validation properties
	// directly at ActivityProperty level, not in a separate validation property.

### Records

Activities are tracked with records. Or in other words, every time an activity is tracked, a record with a data model matching the according activities schema is stored.

	Record (Parse Class)
	--------------------
	objectId	<String>
	activity	<Pointer>
	data		<Object>	// Uses ActivityProperty as JSONSchema
	createdAt	<Date>
	updatedAt	<Date>
	ACL			<ACL>


	
