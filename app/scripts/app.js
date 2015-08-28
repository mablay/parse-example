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
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'chart.js'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    var appId = "dZvf4F93Rzl1SzKASzn9yKPFDfq3ijGmNjVimYD3";
    var jsKey = "JA4ZPZyCr6OUF9yiRTA70Alkhze3r6FqDhL2Vsai";
    Parse.initialize(appId, jsKey);


    $urlRouterProvider.otherwise("/activities");

    $stateProvider
      .state('public', {
        url: '',
        abstract: true,
        data: {public: true},
        templateUrl: "views/layout-public.html",
        controller: function($rootScope) {
          $rootScope.bodyClass="public";
        }
      })
      .state('private', {
        url: '',
        abstract: true,
        views: {
          "": {
            templateUrl: "views/layout-private.html",
            controller: function($rootScope, $state) {
              //console.debug('private');
              $rootScope.bodyClass="private";
            }
          },
          "nav@private": {
            templateUrl: 'views/nav.html',
            controller: function($scope) {
              //console.debug('nav');
            }
          }
        }
      })
      .state('public.login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: 'UserController'
      })
      .state('public.logout', {
        url: "/logout",
        templateUrl: "views/login.html",
        controller: function($state) {
          console.debug('[LOGOUT] User is being logged out...');
          Parse.User.logOut();
          $state.go('public.login');
        }
      })
      .state('public.signup', {
        url: "/signup",
        templateUrl: "views/signup.html",
        controller: 'UserController'
      })
      .state('public.bug', {
        url: "/bug",
        templateUrl: "views/bug.html",
        controller: function($scope, $rootScope) {
          $rootScope.bodyClass='private';
          $scope.previousState = $rootScope.previousState;
        }
      })
      .state('private.activities', {
        url: "/activities",
        templateUrl: "views/activities.html",
        controller: 'ActivityController'
      })
      .state('private.records', {
        url: "/records",
        templateUrl: "views/records.html",
        controller: function($scope) {
          console.debug('private.records');
          $scope.items = ["A", "List", "Of", "Items"];
        }
      });

  })
  .run(function($rootScope, $state){

    $rootScope.$on('$stateChangeStart', function(event, toState){
      if (!toState.data || !toState.data.public) {
        console.debug('[SECURITY] Requesting private state: %s', toState.name);
        if (!Parse.User.current()) {
          event.preventDefault();
          console.warn('Access denied! Please login first.');
          $state.go('public.login');
        }
      }
    });

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
      if (from.name)
        $rootScope.previousState = from.name;
      else
        $rootScope.previousState = 'public.login';
    });

  });
