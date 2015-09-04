'use strict';

angular.module('ngparseApp').controller('SchemaController', function($scope){

  console.debug('[SCHEMA] Activity %o', $scope.$parent.activity);

  $scope.$on('ActivityChanged', function(event, activity){
    console.debug('[SCHEMA] Activity changed => %o', activity.get('name'));
    var schema = activity.get('schema');
    if (schema) {
      $scope.schema = schema;
    } else {
      $scope.schema = $scope.defaultActivitySchema();
      $scope.$broadcast('schemaFormRedraw');
    }
    $scope.schemaModel = {};
  });

  $scope.defaultActivitySchema = function() {
    return {
      type: 'object',
      properties: {}
    };
  };
  $scope.schema = $scope.defaultActivitySchema();
  $scope.schemaModel = {};


  /** Add field */
  $scope.newField = {
    type: 'number',
    name: ''
  };
  $scope.fieldTypeOptions = [
    {value: 'string', name: 'Text'},
    {value: 'number', name: 'Number'}
  ];
  $scope.addField = function(field) {
    console.debug('[SCHEMA] Add field %o', field);
    var newField = $.extend({}, $scope.defaultFieldSchema[field.type])
    newField.title = field.name;
    $scope.schema.properties[field.name] = newField;
    console.debug('new schema: %O', $scope.schema);
    $scope.$broadcast('schemaFormRedraw');
  };


  $scope.model = {};

  $scope.defaultFieldSchema = {
    number: {
      type: "number",
      minimum: 0,
      title: "Number",
      description: "Duration",
      "x-schema-form": {}
    },
    string: {
      type: "string",
      minLength: 2,
      title: "Note",
      description: "Enter some note",
      "x-schema-form": {}
    }
  };


  $scope.saveSchema = function() {
    console.debug('[SCHEMA] Save %o', $scope.schema);
    // Tell the ActivityController (parent) to save the schema within the activity.
    $scope.$parent.saveSchema($scope.schema);
  };



});
