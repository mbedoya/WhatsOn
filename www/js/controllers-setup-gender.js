controllersModule.controller('SetupGenderCtrl', function ($scope, $rootScope, $location, User) {

    $scope.selectGender = function(gender) {

        $rootScope.showLoadingIndicator = true;
        $rootScope.userProfile.gender = gender;
        $rootScope.showLoadingIndicator = false;

        User.register(gender);

        $location.path('/app/thread');

    }

    $scope.initialize = function () {

    }

    $scope.initialize();
});
