angular.module('website', ['ngRoute','firebase'])
  .config(function($routeProvider) {
    $routeProvider
    // defined four routes
      .when('/home', {templateUrl:'partials/home.html'})
      .when('/about', {templateUrl:'partials/about.html'})
      .otherwise({redirectTo: '/home', template:'partials/home.html'});
  });

function MainCtrl($scope, $firebaseArray, $firebaseObject) {
  //firebase
  var ref = new Firebase("https://zcg.firebaseio.com/ann");
  //display data
  $scope.data = $firebaseArray(ref);
  
  //add to todos
  $scope.addTodo = function() {
    //sending data to firebase
    var newPostRef = ref.push({
      text: $scope.formTodoText,
      done: false
    });
    // Get the unique ID generated by push()
    var postID = newPostRef.key();
    $scope.formTodoText = '';
  }

  //update data if checked or not
  $scope.checked = function(id) {
    var condition = id.done;

    if (condition) condition = false;
    else condition = true;

    var updatedTask ={
      text: id.text,
      done: condition
    }

    ref.child(id.$id).update(updatedTask);
  }

  //clear todo
  $scope.clearCompleted = function () {
    var length = $scope.data.length;
    for (var i=0; i<length; i++) {
      if($scope.data[i].done) ref.child($scope.data[i].$id).remove();
    }
  };

  //Daily Jobs
  var jobs = new Firebase("https://zcg.firebaseio.com/jobs");
  $scope.job = $firebaseArray(jobs);

  $scope.addJob = function() {
    var newjobRef = jobs.push({
      FirstName: $scope.firstName || 'first name',
      LastName: $scope.lastName || 'last name',
      Make:  $scope.make || 'Make',
      Model: $scope.model || 'Model',
      Color: '',
      Year: '',
      Vin: '',
      Milage: '',
      Plate: '',
      Status: 'notStarted',
      Done: false
    });
    // Get the unique ID generated by push()
    var jobID = newjobRef.key();
    $scope.firstName = $scope.model = $scope.lastName = $scope.make ='';
  };

  $scope.accessJob = function(job) {
    console.log(job.$id);

  }

  $scope.notStarted  = function(job) {
    if (job.Status === "notStarted") {
      return true;
    }
  }

  $scope.started  = function(job) {
    if (job.Status === "started") {
      return true;
    }
  }

  $scope.finished  = function(job) {
    if (job.Status === "finished") {
      return true;
    }
  }

}
