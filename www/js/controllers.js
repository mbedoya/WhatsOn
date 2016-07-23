var controllersModule =  angular.module('whatson.controllers', [])

        .controller('AppCtrl', function($scope, $rootScope, $location, $ionicModal, $timeout) {

            $scope.name = function(){
                return $rootScope.profile.personalInfo.name;
            }

            $scope.gotoProfile = function(){
                //localStorage.profileVisited = true;
                $location.path('/app/profile');
            }

            $scope.changeText = function(){
                if(localStorage.userType == 'xper'){
                    return "Usuario";
                }else{
                    return "xPer"
                }
            }

            $scope.changeAccountType = function(){
                if(localStorage.userType == 'xper'){
                    localStorage.userType = 'user';
                    $location.path('/app/menu/userhome');
                }else{
                    localStorage.userType = 'xper';
                    if(localStorage.xPerProfileDone){
                        $location.path('/app/menu/tabs/news');
                    }else{
                        $location.path('/app/profiledescription');
                    }
                }
            }

            $scope.showLoading = function(){
                if($rootScope.showLoadingIndicator){
                    return $rootScope.showLoadingIndicator;
                }
                return false;
            }
        })

        .controller('TabsCtrl', function($scope, $rootScope, Utility) {

            $scope.getLocalizedText = function(text){
                return Utility.getLocalizedStringValue(text);
            }

        })



        .controller('PlaylistCtrl', function($scope, $stateParams) {
        })

    ;
