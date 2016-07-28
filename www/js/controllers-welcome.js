controllersModule.controller('WelcomeCtrl', function ($scope, $rootScope, $location, Topic, Firebase) {

    $scope.gotoThread = function (item) {
        $rootScope.selectedTopic = item;
        $location.path('/app/thread');
    }

    $scope.gotoCategory = function () {
        $location.path('/app/category');
    }

    $scope.GetTrendTopic = function (o) {
        var temp = o;
        var o;
        for (o in temp) {

        }
        $scope.topic = temp[o];
        $scope.topic["key"] = o;
    }

    $scope.initialize = function () {

        $rootScope.showLoadingIndicator = true;
        Topic.getLastTopic(function (snapshot) {
            $rootScope.showLoadingIndicator = false;
            $scope.GetTrendTopic(snapshot.val());

            $scope.$apply();

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }

    $scope.initialize();
});
