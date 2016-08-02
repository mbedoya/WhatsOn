controllersModule.controller('CategoryCtrl', function ($scope, $rootScope, $location, Topic) {
   
    $scope.gotoAddTopic = function(){
        $location.path('/app/add-topic'); 
    }

    $scope.gotoThread = function(item){

        console.log(item);
        $rootScope.selectedTopic = item;
        $location.path('/app/thread');
    }

    $scope.initialize = function () {
        Topic.getAdsByCategory(function (snapshot) {
            $scope.ads = snapshot.val();
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        $rootScope.showLoadingIndicator = true;
        Topic.getByCategory(function (snapshot) {
            $rootScope.showLoadingIndicator = false;
            $scope.topics = snapshot.val();
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    $scope.$on('$ionicView.enter', function(){
        $scope.initialize();
    });
});
