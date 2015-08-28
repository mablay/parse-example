angular.module('ngparseApp').factory('parse', function() {
	var appId = "dZvf4F93Rzl1SzKASzn9yKPFDfq3ijGmNjVimYD3";
	var jsKey = "JA4ZPZyCr6OUF9yiRTA70Alkhze3r6FqDhL2Vsai";
	var parse = Parse.initialize(appId, jsKey);
	return parse;
});
