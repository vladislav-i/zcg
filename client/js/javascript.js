
zcg.controller('TodoCtrl', function TodoCtrl($scope, $firebaseArray) {
  var url = 'https://zcg.firebaseio.com';
  var fireRef = new Firebase(url);

  $scope.todos = $firebaseArray(fireRef);

});

/*
function MainCtrl($scope, $firebaseArray) {
  //firebase db
  var url = 'https://zcg.firebaseio.com';
  var fireRef = new Firebase(url);

  $scope.todos = $firebaseArray(fireRef);

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

}*/
