controllersModule.controller('CategoryCtrl', function ($scope, $rootScope, $location, $ionicHistory, $ionicLoading) {

    $scope.doLogin = function(){
        $location.path('/app/setup-name');   
    }

    $scope.gotoAddThread = function(){
        alert($rootScope.userProfile.registered);   
    }

    $scope.addComment = function(){

        var uid = "ZuUGOZYUGnh7pZArvMSnkTsxlN82";
        var newPostKey = firebase.database().ref().child('posts').push().key;
        var postData = { title: $scope.inputMessage.text, name: 'Mauricio Bedoya', time: '2016/07/23' };

        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        console.log(updates);

        firebase.database().ref().update(updates);
    }

    $scope.initialize = function () {

        $scope.inputMessage = { text: '' };
        $scope.threadMessages = new Array();

        var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
        console.log(recentPostsRef);

        /*
        // Find current messages
        recentPostsRef.once("value", function (snapshot) {
            console.log("all data");
            $scope.threadMessages = snapshot.val();
            console.log(snapshot.val());

            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        */

        // Attach an asynchronous callback to read the data at our posts reference
        recentPostsRef.on("child_added", function (snapshot) {
            console.log("new children");
            $scope.threadMessages.splice(0, 0, snapshot.val());
            console.log(snapshot.val());

            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }

    $scope.initialize();
});
