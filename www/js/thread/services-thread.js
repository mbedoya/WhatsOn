servicesModule
    .factory('Thread', function ($rootScope, Utility, Firebase, Security) {

        var fb_object_name = 'topic-threads';

        return {
            addMessage: function (message, fx) {

                var data = {
                    title: message,
                    name: Security.getUserName(),
                    gender: Security.getUserGender()
                };

                Firebase.saveObject('/'+ fb_object_name +'/' + $rootScope.selectedTopic.key, data, fx);

                //Its parent count needs to be updated
            },
            attachToChildren: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref('/'+ fb_object_name +'/' + $rootScope.selectedTopic.key).limitToLast(10);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.on("child_added", fx, fxError);
            },
            getAll: function (fx, fxError) {

                var recentPostsRef = firebase.database().ref('/'+ fb_object_name +'/' + $rootScope.selectedTopic.key).limitToLast(20);

                // Attach an asynchronous callback to read the data at our posts reference
                recentPostsRef.once("value", fx, fxError);
            }
        }
    });