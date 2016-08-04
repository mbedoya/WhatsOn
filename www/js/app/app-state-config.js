mainModule
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

            .state('app.category-tabs', {
                url: '/category-tabs',
                abstract: true,
                views: {
                    'app-view': {
                        templateUrl: 'templates/topic/category-tabs.html',
                        controller: 'CategoryTabsCtrl'
                    }
                }
            })

            .state('app.category-tabs.category', {
                url: '/category',
                views: {
                    'popular-content': {
                        templateUrl: 'templates/topic/category.html',
                        controller: 'CategoryCtrl'
                    }
                }
            })

            .state('app.category-tabs.category-recent', {
                url: '/category-recent',
                views: {
                    'recent-content': {
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