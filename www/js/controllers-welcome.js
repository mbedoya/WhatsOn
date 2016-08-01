controllersModule.controller('WelcomeCtrl', function ($scope, $rootScope, $location, Topic, Firebase) {

    $scope.gotoThread = function (item) {
        $rootScope.selectedTopic = item;
        $location.path('/app/thread');
    }

    $scope.gotoCategory = function (item) {
        $rootScope.selectedCategory = item;
        $location.path('/app/category');
    }

    $scope.GetTrendTopic = function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            $scope.topic = childSnapshot.val();
        });
    }

    $scope.initialize = function () {

        $rootScope.showLoadingIndicator = true;
        Topic.getLastTopic(function (snapshot) {
            $rootScope.showLoadingIndicator = false;
            $scope.GetTrendTopic(snapshot);
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }

    $scope.initialize();
});
