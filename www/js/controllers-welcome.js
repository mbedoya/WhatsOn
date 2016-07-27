controllersModule.controller('WelcomeCtrl', function ($scope, $rootScope, $location, Topic) {

    $scope.gotoThread = function(item){
        $rootScope.selectedTopic = item;
        $location.path('/app/thread');
    }

    $scope.gotoCategory = function(){
        $location.path('/app/category');
    }

    $scope.initialize = function () {

        Topic.getLastTopic(function (snapshot) {
            var temp = snapshot.val();
            console.log(temp);
            var o;
            for(o in temp){
                
            }
            $scope.topic = temp[o];
            $scope.topic["key"] = o;
            console.log($scope.topic);
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }

    $scope.initialize();
});
