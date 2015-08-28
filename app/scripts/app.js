'use strict';

/**
 * @ngdoc overview
 * @name ngparseApp
 * @description
 * # ngparseApp
 *
 * Main module of the application.
 */
angular
  .module('ngparseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js'
  ])
  .config(function ($routeProvider) {

    var appId = "dZvf4F93Rzl1SzKASzn9yKPFDfq3ijGmNjVimYD3";
    var jsKey = "JA4ZPZyCr6OUF9yiRTA70Alkhze3r6FqDhL2Vsai";
    Parse.initialize(appId, jsKey);


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
