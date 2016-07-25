controllersModule.controller('ThreadCtrl', function ($scope, $rootScope, $location, Utility, Thread) {

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

        $rootScope.showLoadingIndicator = true;
        Thread.sendMessage($scope.inputMessage.text);
        $rootScope.showLoadingIndicator = false;

        //Clear input 
        $scope.inputMessage.text = '';
    }

    $scope.initialize = function () {

        $scope.inputMessage = { text: '' };
        $scope.threadMessages = new Array();

        Thread.attachToChildren(function (snapshot) {
            $scope.threadMessages.splice(0, 0, snapshot.val());
            $scope.$apply();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    $scope.initialize();

});
