controllersModule.controller('WelcomeCtrl', function ($scope, $rootScope, $location, $ionicHistory, $ionicLoading) {

    $scope.gotoThread = function(){
        $location.path('/app/thread');
    }

    $scope.gotoCategory = function(){
        $location.path('/app/category');
    }

    $scope.initialize = function () {
    }

    $scope.initialize();
});
