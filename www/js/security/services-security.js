servicesModule
    .factory('Security', function ($rootScope) {

        return {
            userIsAuthenticated: function (topic) {
                return $rootScope.userProfile.registered;
            },
            getUserName: function () {
                return $rootScope.userProfile.name;
            },
            getUserGender: function () {
                return $rootScope.userProfile.gender;
            },
            getUserID: function () {
                return $rootScope.userProfile.uid;
            }
        }
    });