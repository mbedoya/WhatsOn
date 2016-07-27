controllersModule.controller('AddTopicCtrl', function ($scope, $rootScope, $location, Topic, Security) {

    $scope.continue = function(){

        if (!$scope.topic.name || String($scope.topic.name).length == 0) {
            $rootScope.helpWindow("Ingresa el nombre");
            return;
        }

        if (String($scope.topic.name).length < 5) {
            $rootScope.helpWindow("Ingresa mínimo 5 caracteres en el Nombre");
            return;
        }

        $rootScope.showLoadingIndicator = true;
        Topic.add($scope.topic.name);
        $rootScope.showLoadingIndicator = false;

        $location.path('/app/category');
    }

    $scope.initialize = function () {

        //Check user
        if(!Security.userIsAuthenticated){
            $rootScope.returnPath = "/app/add-topic";
            $location.path('/app/setup-name');
        }

        $scope.topic = { name: ''};
    }

    $scope.initialize();
});
