controllersModule.controller('SetupGenderCtrl', function ($scope, $rootScope, $location, $ionicHistory, $ionicLoading) {

    $scope.selectGender = function(gender) {

        var uid = firebase.database().ref().child('users').push().key;
        var userData = { name: $rootScope.userProfile.name, gender: gender, creationTime: '2016/07/23' };

        var updates = {};
        updates['/users/' + uid] = userData;

        firebase.database().ref().update(updates);

        $rootScope.userProfile.uid = uid;
        $rootScope.userProfile.uid = gender;

        localStorage.wo_name = $rootScope.userProfile.name;
        localStorage.wo_uid = $rootScope.userProfile.uid;
        localStorage.wo_gender = $rootScope.userProfile.gender;

        $location.path('/app/thread');

    }

    $scope.initialize = function () {

    }

    $scope.initialize();
});
