angular.module('website', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
    // defined four routes
      .when('/home', {templateUrl:'partials/home.html'})
      .when('/about', {templateUrl:'partials/about.html'})
      .when('/projects', {templateUrl:'partials/projects.html'})
      .when('/contact', {templateUrl:'partials/contact.html'})
      .otherwise({redirectTo: '/home', template:'partials/home.html'});
  });

function MainCtrl($scope) {
  //display todo
  $scope.todos=[
  {text: 'Build an app', done:false}
  ];
  //add to todos
  $scope.addTodo = function() {
    console.log($scope.formTodoText);
    $scope.todos.push({text:$scope.formTodoText, done:false});
    $scope.formTodoText = '';
  }
  //clear todo
  $scope.clearCompleted = function () {
    $scope.todos = _.filter($scope.todos, function(todo){
      return !todo.done;
    });
  };
}
