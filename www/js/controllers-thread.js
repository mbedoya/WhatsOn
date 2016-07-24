controllersModule.controller('ThreadCtrl', function ($scope, $rootScope, $location, Utility) {

    $scope.doLogin = function () {
        $location.path('/app/setup-name');
    }

    $scope.isItMyPost = function (post) {
        return post.uid == $rootScope.userProfile.uid;
    }

    $scope.getDateText = function(post){
        return Utility.getDateDiffFormatted(post.time);
    }

    $scope.addComment = function () {

        var uid = $rootScope.userProfile.uid;
        var newPostKey = firebase.database().ref().child('posts').push().key;

        var postData = {
            title: $scope.inputMessage.text,
            name: $rootScope.userProfile.name,
            uid: uid,
            time: Utility.getCurrentDate()
        };

        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        firebase.database().ref().update(updates);
    }

    $scope.initialize = function () {

        $scope.inputMessage = { text: '' };
        $scope.threadMessages = new Array();

        var recentPostsRef = firebase.database().ref('posts').limitToLast(100);

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
            $scope.threadMessages.splice(0, 0, snapshot.val());
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }

    $scope.initialize();
});
