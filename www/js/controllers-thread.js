controllersModule.controller('ThreadCtrl', function ($scope, $rootScope, $location, $ionicHistory, $ionicLoading) {

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
        $scope.threadMessages = null;

        var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
        console.log(recentPostsRef);

        // Attach an asynchronous callback to read the data at our posts reference
        recentPostsRef.on("value", function (snapshot) {
            $scope.threadMessages = snapshot.val();
            console.log(snapshot.val());

            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        return;

        /*
                firebase.database().ref('users/ZuUGOZYUGnh7pZArvMSnkTsxlN82').set({
                    username: 'Mauricio',
                    email: 'mauricio.bedoya@gmail.com'
                });
        
                */

        return;

        $rootScope.productionVersion = true;

    }

    $scope.initialize();
});
