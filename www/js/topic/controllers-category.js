controllersModule.controller('CategoryCtrl', function ($scope, $rootScope, $location, Topic, Utility) {

    $scope.gotoAddTopic = function () {
        $location.path('/app/add-topic');
    }

    $scope.gotoThread = function (item) {

        console.log(item);
        $rootScope.selectedTopic = item;
        $location.path('/app/thread');
    }

    $scope.getDateText = function (item) {
        return Utility.getDateDiffFormatted(item.time);
    }

    $scope.initialize = function () {

        $scope.topics = new Array();

        Topic.getAdsByCategory(function (snapshot) {
            $scope.ads = snapshot.val();
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        $rootScope.showLoadingIndicator = true;

        console.log($location.url());
        if ($location.url() == "/app/category-tabs/category-recent") {
            Topic.getRecentByCategory(function (snapshot) {
                snapshot.forEach(function (childsnapshot) {
                    $scope.topics.splice(0, 0, childsnapshot.val());
                });
                $rootScope.showLoadingIndicator = false;
                $scope.$apply();

            }, function (errorObject) {

                $rootScope.showLoadingIndicator = false;
                console.log("The read failed: " + errorObject.code);
            });
        } else {

            Topic.getPopularByCategory(function (snapshot) {
                snapshot.forEach(function (childsnapshot) {
                    $scope.topics.splice(0, 0, childsnapshot.val());
                });
                $rootScope.showLoadingIndicator = false;
                $scope.$apply();

            }, function (errorObject) {

                $rootScope.showLoadingIndicator = false;
                console.log("The read failed: " + errorObject.code);
            });

        }


    }

    $scope.$on('$ionicView.enter', function () {
        $scope.initialize();
    });
});
