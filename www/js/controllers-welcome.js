controllersModule.controller('WelcomeCtrl', function ($scope, $rootScope, $location, $ionicHistory, $ionicLoading) {

    $scope.getLocalizedText = function (text) {
        return Utility.getLocalizedStringValue(text);
    }

    $scope.continue = function () {

        $ionicHistory.nextViewOptions({
            historyRoot: true
        });
        $location.path('/app/setupmobile');
    }

    $scope.gotoThread = function(){
        $location.path('/app/thread');
    }

    $scope.gotoCategory = function(){
        $location.path('/app/category');
    }

    $scope.showContinue = function () {
        if (localStorage && localStorage.mobileVerified) {
            return false;
        }
        return true;
    }

    $scope.initializeGA = function () {
        setTimeout(function () {

            if (window.plugins && window.plugins.gaPlugin) {

                var codigoAnalytics = 'UA-75425390-1';
                if ($rootScope.productionVersion) {
                    $rootScope.gaPlugin = window.plugins.gaPlugin;
                    $rootScope.gaPlugin.init(
                        function () {
                            Utility.trackPage("Bienvenido");
                        },
                        function () {

                        },
                        codigoAnalytics,
                        10);
                }
            }

            document.addEventListener("online", function () {
                $rootScope.$broadcast('online');
            }, false);

        }, 2000);
    }

    $scope.initialize = function () {

        return;

        var uid = "ZuUGOZYUGnh7pZArvMSnkTsxlN82";
        var newPostKey = firebase.database().ref().child('posts').push().key;
        var postData = { title: 'My cool Post' };

        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        console.log(updates);

        firebase.database().ref().update(updates);

        /*
                firebase.database().ref('users/ZuUGOZYUGnh7pZArvMSnkTsxlN82').set({
                    username: 'Mauricio',
                    email: 'mauricio.bedoya@gmail.com'
                });
        
                */

        return;

        $rootScope.productionVersion = true;

        $scope.initializeGA();

        localDB = new database_js();
        localDB.initialize();

        if ($rootScope.productionVersion) {
            $rootScope.configuration = { serverIP: 'http://mungos.co:8083', localDB: localDB };
        } else {
            $rootScope.configuration = { serverIP: 'http://laboru.co:8086', localDB: localDB };
            //$rootScope.configuration = { serverIP : 'http://localhost:57565', localDB: localDB };
        }

        language = JSON.parse(lang);
        $rootScope.languageDefinitions = language;

        //Set Empty Profile
        $rootScope.profile = {
            personalInfo:
            {
                id: null,
                name: "",
                mobile: ""
            },
            businessInfo:
            {
                bio: "",
                skills: []
            }
        };

        if (localStorage) {
            if (localStorage.mobileVerified) {

                $scope.loading = true;

                $rootScope.profile = {
                    personalInfo:
                    {
                        id: localStorage.id,
                        name: localStorage.name,
                        mobile: localStorage.mobile
                    },
                    businessInfo:
                    {
                        bio: localStorage.description,
                        skills: ["Project Manager", "Developer"]
                    }
                };

                $rootScope.xPerDescription = localStorage.description;

                if (localStorage.skills) {
                    $rootScope.xPerSkills = localStorage.skills.split('-');
                }

                //Get All Skills
                Skills.getAll(function (success, data) {

                    $scope.loading = false;

                    if (success) {

                        $rootScope.skills = data;

                    } else {
                        $scope.helpWindow("", "Error inicializando");
                    }

                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });

                    if (localStorage.userType == 'xper') {
                        if (localStorage.xPerProfileDone) {
                            $location.path('/app/menu/tabs/news');
                        } else {
                            $location.path('/app/profiledescription');
                        }
                    } else {
                        $location.path('/app/menu/userhome');
                    }
                });


            }
        }
    }

    $scope.initialize();

    $scope.showLoading = function () {
        return $scope.loading;
    }
});
