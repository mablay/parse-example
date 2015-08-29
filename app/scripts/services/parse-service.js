'use strict';

angular.module('ngparseApp').factory('parse', function() {
	var appId = "";
	var jsKey = "";
	var parse = Parse.initialize(appId, jsKey);
	return parse;
});
