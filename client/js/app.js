var zcg = angular.module('website', ['ngRoute', 'firebase'])
  .config(function($routeProvider) {
    $routeProvider
    // defined four routes
      .when('/home', {templateUrl:'partials/home.html'})
      .when('/about', {templateUrl:'partials/about.html'})
      .when('/projects', {templateUrl:'partials/projects.html'})
      .when('/contact', {templateUrl:'partials/contact.html'})
      .otherwise({redirectTo: '/home', template:'partials/home.html'});
  });