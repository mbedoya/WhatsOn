// Ionic WhatsOn App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('whatson', ['ionic', 'whatson.controllers', 'whatson.services', 'ion-floating-menu'])

.run(function($ionicPlatform, $rootScope, $ionicPopup) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //Global Methods
    $rootScope.helpWindow = function(message) {
        var popup = $ionicPopup.alert({
            title: "",
            template: message
        });
    };

    //Initialize App Data
    $rootScope.categories = [
        {title: 'Polemizar', description: 'Vamos a expresarnos!', key: '-KNlqWR1wHkkwFwy6w3G', img: 'chat.png'},
        {title: 'Salir a callejear', description: '¿Quieres parcharte y no sabes que hacer?', key: '-KNlqWRTUXrw_WBX0Tyq', img: 'dancing.png'},
        {title: 'Conocer gente chévere', description: '¿Quieres sólo hablar?', key: '-KNlqWRZBesJ5Pclcixz', img: 'meet.png'}
    ];

    //Initializar User Data
    if(localStorage.wo_name){
        //Init Basic Data
        $rootScope.userProfile = {
            registered: true,
            name: localStorage.wo_name,
            uid: localStorage.wo_uid,
            gender: localStorage.wo_gender
        }
    }else{
        //Init Empty Basic Data
        $rootScope.userProfile = {
            registered: false,
            name: '',
            uid: '',
            gender: ''
        }
    }

    

  });
})

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/app.html',
                controller: 'AppCtrl'
            })

            .state('app.home', {
                url: '/home',
                views: {
                    'app-view': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })

            .state('app.add-topic', {
                url: '/add-topic',
                views: {
                    'app-view': {
                        templateUrl: 'templates/topic/add-topic.html',
                        controller: 'AddTopicCtrl'
                    }
                }
            })

            .state('app.category', {
                url: '/category',
                views: {
                    'app-view': {
                        templateUrl: 'templates/topic/category.html',
                        controller: 'CategoryCtrl'
                    }
                }
            })

            .state('app.setup-name', {
                url: '/setup-name',
                views: {
                    'app-view': {
                        templateUrl: 'templates/security/setup-name.html',
                        controller: 'SetupNameCtrl'
                    }
                }
            })

            .state('app.setup-gender', {
                url: '/setup-gender',
                views: {
                    'app-view': {
                        templateUrl: 'templates/security/setup-gender.html',
                        controller: 'SetupGenderCtrl'
                    }
                }
            })

            .state('app.thread', {
                url: '/thread',
                views: {
                    'app-view': {
                        templateUrl: 'templates/thread.html',
                        controller: 'ThreadCtrl'
                    }
                }
            })

            ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
    });

angular.module('whatson.controllers');
