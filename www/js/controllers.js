var controllersModule =  angular.module('whatson.controllers', [])

        .controller('AppCtrl', function($scope, $rootScope, $location, $ionicModal, $timeout) {

            $scope.showLoading = function(){
                if($rootScope.showLoadingIndicator){
                    return $rootScope.showLoadingIndicator;
                }
                return false;
            }
        })

        .controller('TabsCtrl', function($scope, $rootScope, Utility) {

        })



        .controller('PlaylistCtrl', function($scope, $stateParams) {
        })

    ;
