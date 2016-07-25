controllersModule.controller('CategoryCtrl', function ($scope, $rootScope, $location, $ionicHistory, $ionicLoading) {

    $scope.gotoAddThread = function(){
        alert($rootScope.userProfile.registered);   
    }

    $scope.initialize = function () {

    }

    $scope.initialize();
});
