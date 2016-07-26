controllersModule.controller('ThreadCtrl', function ($scope, $rootScope, $location, Utility, Thread) {

    $scope.doLogin = function () {
        $location.path('/app/setup-name');
    }

    $scope.isItMyPost = function (post) {
        return post.uid == $rootScope.userProfile.uid;
    }

    $scope.getDateText = function (post) {
        return Utility.getDateDiffFormatted(post.time);
    }



    $scope.loadMore = function () {
        console.log("load more");

        $scope.doInfiteScroll = false;

        Thread.getAll(function (snapshot) {

            console.log("all data");
            var temp = snapshot.val();
            console.log(temp);
            for(var o in temp){
                console.log(o.val().name);
                $scope.threadMessages.push(o.val());
            }
            //$scope.threadMessages = temp;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$apply();

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    $scope.addComment = function () {

        $rootScope.showLoadingIndicator = true;
        Thread.sendMessage($scope.inputMessage.text);
        $rootScope.showLoadingIndicator = false;

        //Clear input 
        $scope.inputMessage.text = '';
    }

    $scope.initialize = function () {

        $scope.doInfiteScroll = true; 
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
