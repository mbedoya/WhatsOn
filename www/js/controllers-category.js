controllersModule.controller('CategoryCtrl', function ($scope, $rootScope, $location, Topic) {

    $scope.gotoAddTopic = function(){
        $location.path('/app/add-topic');   
    }

    $scope.initialize = function () {

        Topic.getAll(function (snapshot) {
            $scope.topics = snapshot.val();
            console.log($scope.topics);
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    $scope.initialize();
});
