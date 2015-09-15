'use strict';

angular.module('ngparseApp').controller('SchemaController', function($scope){

  console.debug('[SCHEMA] Activity %o', $scope.$parent.activity);

  /** DEFAULT FIELD SCHEMA **/
  $scope.defaultFieldSchema = {
    number: {
      type: "number",
      minimum: 0,
      description: "Number"
    },
    string: {
      type: "string",
      minLength: 1,
      description: "Text"
    }
  };

  /** DEFAULT ACTIVITY SCHEMA **/
  $scope.defaultActivitySchema = function() {
    return {
      type: 'object',
      properties: {}
    };
  };

  $scope.model = {};
  $scope.schema = $scope.defaultActivitySchema();
  $scope.schemaModel = {};
  $scope.asfFields = {};


  /** ActivityChanged custom EVENT listener - used for broadcasting **/
  $scope.$on('ActivityChanged', function(event, activity) {
    console.debug('[SCHEMA] Activity changed => %o', activity.get('name'));
    var schema = activity.get('schema');
    if (schema) {
      $scope.schema = schema;
      $scope.updateFieldSchemas();
    } else {
      $scope.schema = $scope.defaultActivitySchema();
      $scope.$broadcast('schemaFormRedraw');
    }
    $scope.schemaModel = {};
  });



  /** UI - ADD FIELD DATA */
  /** new field - model **/
  $scope.newField = {
    type: 'number',
    name: ''
  };
  /** new field - select options **/
  $scope.fieldTypeOptions = [
    {value: 'string', name: 'Text'},
    {value: 'number', name: 'Number'}
  ];



  /** UI Actions **/

  /** new field - onClick handler **/
  $scope.addField = function(field) {
    console.debug('[SCHEMA] Add field %o', field);
    var newField = $.extend({}, $scope.defaultFieldSchema[field.type]);
    newField.description = "";
    $scope.schema.properties[field.name] = newField;
    console.debug('new schema: %O', $scope.schema);

    // Add to asf data model
    var fieldSchema = $scope.defaultActivitySchema();
    fieldSchema.properties[field.name] = newField;
    $scope.asfFields[field.name] = fieldSchema;

    $scope.$broadcast('schemaFormRedraw');
  };

  $scope.deleteField = function (name) {
    console.debug('Delete field %o', name);
    delete $scope.asfFields[name];
    delete $scope.schema.properties[name];
  };

  $scope.saveSchema = function() {
    console.debug('[SCHEMA] Save %o', $scope.schema);
    // Tell the ActivityController (parent) to save the schema within the activity.
    $scope.$parent.saveSchema($scope.schema);
  };



  /*** Service methods - to be extracted **/
  /** Creates an object containing all fields as single form schema **/
  $scope.updateFieldSchemas = function() {
    var schema = {};
    var properties = $scope.schema.properties;
    var propertyNames = Object.keys(properties);
    console.debug('[SCHEMA] Update fields %o', propertyNames);
    for (var i=0; i<propertyNames.length; i++) {
      var name = propertyNames[i];
      var fieldSchema = $scope.defaultActivitySchema();
      fieldSchema.properties[name] = properties[name];
      schema[name] = fieldSchema;
    }
    $scope.asfFields = schema;
  };


});
