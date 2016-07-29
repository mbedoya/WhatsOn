controllersModule.controller('WelcomeCtrl', function ($scope, $rootScope, $location, Topic, Firebase) {

    $scope.gotoThread = function (item) {
        $rootScope.selectedTopic = item;
        $location.path('/app/thread');
    }

    $scope.gotoCategory = function () {
        $location.path('/app/category');
    }

    $scope.test = function () {

        var recentPostsRef = firebase.database().ref(object);
        recentPostsRef.once("value", , fxError);

        //Get ID for new object
        var newObjectKey = "child1";
        var objectName = "test";

        //Add Basic Data to Objects
        dataObject = {
            name: "i am a child",
            uid: "123"
        };

        console.log(dataObject);

        var updates = {};
        updates['/' + objectName + '/' + newObjectKey] = dataObject;

        //Save to Database
        firebase.database().ref().update(updates, function (error) {
            console.log(error);
        });
    }

    $scope.GetTrendTopic = function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            $scope.topic = childSnapshot.val();
        });
    }

    $scope.initialize = function () {

        $rootScope.showLoadingIndicator = true;
        Topic.getLastTopic(function (snapshot) {
            $rootScope.showLoadingIndicator = false;
            $scope.GetTrendTopic(snapshot);
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }

    $scope.initialize();
});
