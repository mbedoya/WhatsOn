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
            var temp = snapshot.val();

            console.log(temp);
            for(var o in temp){
                console.log(o.val().name);
                $scope.threadMessages.push(o.val());
            }
            
            var i = 0;
            var tempA = new Array();
            for(var o in temp){
                i = i+1;
                if(i < 10){
                    tempA.splice(0,0,temp[o]);
                }
            }
            for(i=0; i<tempA.length; i++){
                $scope.threadMessages.push(tempA[i]);
            }
            
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
