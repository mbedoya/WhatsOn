controllersModule.controller('SetupNameCtrl', function ($scope, $rootScope, $location, $ionicHistory, $ionicLoading) {

    $scope.continue = function(){

        if (!$rootScope.userProfile.name || String($rootScope.userProfile.name).length == 0) {
            $rootScope.helpWindow("Ingresa tu Nombre");
            return;
        }

        if (String($rootScope.userProfile.name).length < 3) {
            $rootScope.helpWindow("Ingresa mínimo 3 caracteres en tu Nombre");
            return;
        }

        $location.path('/app/setup-gender');
        
    }

    $scope.initialize = function () {

    }

    $scope.initialize();
});
