var zcgApp = angular.module('website', ['ngRoute','firebase', 'ui.router', 'xeditable'])
  .config(function($routeProvider, $stateProvider) {
    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl:'partials/home.html'
      })
      .state('about', {
        url:'/about',
        views: {
          '': { templateUrl:'partials/about.html'},
          "workOrder@about": {
            templateUrl: 'partials/workOrder.html'
          }
        }
      });
      .state("otherwise", { url : '/home'});

      $routeProvider.otherwise({
            redirectTo: '/home'
        });
  });

// zcgApp.run(function(editableOptions) {
//   editableOptions.theme = 'bs3';
// });


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
      Done: {
        Done: false
      }
    });
    // Get the unique ID generated by push()
    var jobID = newjobRef.key();
    $scope.firstName = $scope.model = $scope.lastName = $scope.make ='';
  };


  $scope.checkedJobs = function(id) {
    var jobs = new Firebase("https://zcg.firebaseio.com/jobs");
    var condition = id.Done.Done;
    console.log(id);

    if (condition) condition = false;
    else condition = true;

    var updatedDone ={
      Done: condition
    }

    jobs.child(id.$id).child("Done").update(updatedDone);
  }


  $scope.removeJob = function() {

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

  $scope.accessJob = function(job) {
     $scope.user = {
      'first': job.FirstName || '',
      'last': job.LastName || ''
    };

    $scope.car = {
      'model': job.Model || '',
      'vin': '',
      'prod': '',
      'mlgIn': '',
      'mlgOut': '',
      'licPlate': '',
      'color': '',
      'trans': '',
      'fuel': ''
    };
    console.log($scope.car);
  }


  ///- - - WORK ORDER - - -///

 

}
