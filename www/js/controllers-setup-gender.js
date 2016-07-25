controllersModule.controller('SetupGenderCtrl', function ($scope, $rootScope, $location, Utility) {

    $scope.selectGender = function(gender) {

        var uid = firebase.database().ref().child('users').push().key;

        var userData = { 
            name: $rootScope.userProfile.name, 
            gender: gender, 
            creationTime: Utility.getCurrentDate() 
        };

        var updates = {};
        updates['/users/' + uid] = userData;

        firebase.database().ref().update(updates);

        //Set User Data
        $rootScope.userProfile.uid = uid;
        $rootScope.userProfile.gender = gender;
        $rootScope.userProfile.registered = true;

        //Storage User Data
        localStorage.wo_name = $rootScope.userProfile.name;
        localStorage.wo_uid = $rootScope.userProfile.uid;
        localStorage.wo_gender = $rootScope.userProfile.gender;

        $location.path('/app/thread');

    }

    $scope.initialize = function () {

    }

    $scope.initialize();
});
