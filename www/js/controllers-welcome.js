controllersModule.controller('WelcomeCtrl', function ($scope, $rootScope, $location, Topic, Firebase) {

    $scope.test = function () {
        //Add Ads
        var data = {
            title: 'Locura McDonalds',
            description: 'Estamos locos en McDonalds, tenemos hamburguesas desde 2.500',
            img: 'https://firebasestorage.googleapis.com/v0/b/whatson-8dfe7.appspot.com/o/McDonalds.png?alt=media&token=72c5ef9a-5fa7-4de7-81a8-95e5bb881f56'
        }
        Firebase.saveObject("/category-ads/" + $rootScope.categories[1].key, data, function (key, error) {

        });
    }

    $scope.gotoThread = function (item) {
        $rootScope.selectedTopic = item;
        $location.path('/app/thread');
    }

    $scope.gotoCategory = function (item) {
        $rootScope.selectedCategory = item;
        $location.path('/app/category');
    }

    $scope.GetTrendTopic = function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            $scope.topic = childSnapshot.val();
        });
    }

    $scope.GetTrendTopic2 = function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            $scope.topic2 = childSnapshot.val();
        });
    }

    $scope.initialize = function () {

        //Get Topic 0
        $rootScope.showLoadingIndicator = true;
        Topic.getLastTopicByCategory($rootScope.categories[0].key, function (snapshot) {
            $rootScope.showLoadingIndicator = false;
            $scope.GetTrendTopic(snapshot);
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        //Get Topic 1
        $rootScope.showLoadingIndicator = true;
        Topic.getLastTopicByCategory($rootScope.categories[1].key, function (snapshot) {
            $rootScope.showLoadingIndicator = false;
            $scope.GetTrendTopic2(snapshot);
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }

    $scope.initialize();
});
